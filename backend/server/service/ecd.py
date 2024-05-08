from datetime import time
from typing import BinaryIO, Optional

from bson import ObjectId
from fastapi import HTTPException
from motor import motor_asyncio

from ..database import PyObjectId
from ..model.ecd import EcdModel, EcdIdFilename, SignalType, SignalResponse, SignalDomain, Signal, Verdict, \
    ConditionAnalyzeResponse
from ..utils.ecd_signal_utils import import_mat, convert_to_float_second, get_signal_time, p_before_qrs_test, \
    p_values_test


def _process_single_signal(signal,
                           frequency,
                           domain: SignalDomain,
                           start_time,
                           end_time) -> Signal:
    data = signal['data']

    elements = {
        'P': signal['P'],
        'Q': signal['Q'],
        'R': signal['R'],
        'S': signal['S'],
        'T': signal['T']
    }

    if domain == SignalDomain.time:
        elements = {
            k:
                [get_signal_time(s, frequency) for s in v]
            for (k, v) in elements.items()
        }

    if start_time is not None and end_time is not None:
        if domain == SignalDomain.time:
            start_range = int(convert_to_float_second(start_time) * frequency)
            end_range = int(convert_to_float_second(end_time) * frequency)
        else:
            start_range = start_time
            end_range = end_time

        elements = {
            k:
                list(filter(lambda x: start_time <= x <= end_time, v))
            for (k, v) in elements.items()
        }
        data = data[start_range: min(len(data), end_range + 1)]

    return Signal(**elements, data=data)


class EcdService:
    def __init__(self, ecd_collection: motor_asyncio.AsyncIOMotorCollection):
        self.ecd_collection: motor_asyncio.AsyncIOMotorCollection = ecd_collection

    async def save_ecd_file(self, hea: BinaryIO, mat: BinaryIO, max_files: int) -> PyObjectId:
        if await self.get_ecd_size() >= max_files:
            raise HTTPException(400)
        ecd = import_mat(hea, mat)
        result = await self.ecd_collection.insert_one(ecd.model_dump(by_alias=True, exclude_unset=True))
        return PyObjectId(result.inserted_id)

    async def find_ecd_by_id(self, ecd_id: PyObjectId) -> Optional[EcdModel]:
        result = await self.ecd_collection.find_one(
            {'_id': ObjectId(ecd_id)}
        )
        if result is not None:
            return EcdModel(**result)
        return None

    async def get_ecd_ids_and_names(self) -> list[EcdIdFilename]:
        result = self.ecd_collection.find(filter={}, projection={
            '_id': 1,
            'filename': 1,
            'size': 1,
            'frequency': 1
        })
        return [EcdIdFilename(_id=r['_id'], filename=r['filename'], length=get_signal_time(r['size'], r['frequency']))
                for r in list(await result.to_list(None))]

    async def get_signal_data(self,
                              ecd_id: PyObjectId,
                              signal_types: list[SignalType],
                              domain: SignalDomain,
                              start_time: time | int = None,
                              end_time: time | int = None) -> SignalResponse:
        projection = {'_id': 0, 'frequency': 1}
        projection.update({_type: 1 for _type in signal_types})
        result = await self.ecd_collection.find_one(
            filter={
                '_id': ObjectId(ecd_id)
            },
            projection=projection
        )

        if result is None:
            raise HTTPException(status_code=404, detail='ECD not found')

        frequency = int(result['frequency'])
        signals = {_type: _process_single_signal(result[_type], frequency, domain, start_time, end_time) for _type
                   in signal_types}
        return SignalResponse(frequency=frequency, signals=signals)

    async def get_ecd_size(self) -> int:
        return await self.ecd_collection.count_documents({})

    async def prune(self) -> None:
        await self.ecd_collection.delete_many({})

    async def analyze_conditions(self, ecd_id: PyObjectId) -> ConditionAnalyzeResponse:
        data = await self.get_signal_data(
            ecd_id,
            [SignalType.I, SignalType.II, SignalType.AVR],
            SignalDomain.numeric,
        )
        I = data.signals[SignalType.I]
        II = data.signals[SignalType.II]
        AVR = data.signals[SignalType.AVR]

        results = {
            'I_p_before_qrs': p_before_qrs_test(I, 2),
            'II_p_before_qrs': p_before_qrs_test(II, 2),
            'AVR_p_before_qrs': p_before_qrs_test(AVR, 2),
            'verdict': Verdict.dunno
        }
        if not (results['I_p_before_qrs'] and results['II_p_before_qrs'] and results['AVR_p_before_qrs']):
            return ConditionAnalyzeResponse(**results)

        results['I_p_positive'] = p_values_test(I, lambda x: x > 0)
        results['II_p_positive'] = p_values_test(I, lambda x: x > 0)
        results['AVR_p_negative'] = p_values_test(I, lambda x: x < 0)
        if not (results['I_p_positive'] and results['II_p_positive'] and results['AVR_p_negative']):
            return ConditionAnalyzeResponse(**results)

        results['bpm'] = (I.bpm + II.bpm + AVR.bpm) / 3
        if results['bpm'] > 100:
            results['verdict'] = Verdict.tachycardia
        elif results['bpm'] > 60:
            results['verdict'] = Verdict.normal
        else:
            results['verdict'] = Verdict.bradycardia

        return ConditionAnalyzeResponse(**results)
