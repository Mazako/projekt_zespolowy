from datetime import time
from typing import BinaryIO, Optional

from bson import ObjectId
from fastapi import HTTPException
from motor import motor_asyncio

from ..database import PyObjectId
from ..model.ecd import EcdModel, EcdIdFilename, SignalType, SignalResponse
from ..utils.ecd_signal_utils import import_mat, convert_to_float_second, get_signal_time


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

    async def get_signal_data(self, ecd_id: PyObjectId, signal_type: SignalType, start_time: time = None,
                              end_time: time = None) -> SignalResponse:
        result = await self.ecd_collection.find_one(
            filter={
                '_id': ObjectId(ecd_id)
            },
            projection={
                '_id': 0,
                'frequency': 1,
                signal_type: 1,
                'P': 1,
                'Q': 1,
                'R': 1,
                'S': 1,
                'T': 1,
            }
        )

        if result is None:
            raise HTTPException(status_code=404, detail='ECD not found')

        frequency = int(result['frequency'])
        signal = result[signal_type]
        data = signal['data']

        elements = {
            'P': signal['P'],
            'Q': signal['Q'],
            'R': signal['R'],
            'S': signal['S'],
            'T': signal['T']
        }

        elements = {
            k:
            [get_signal_time(s, frequency) for s in v]
            for (k, v) in elements.items()
        }

        if start_time is not None and end_time is not None:
            start_range = int(convert_to_float_second(start_time) * frequency)
            end_range = int(convert_to_float_second(end_time) * frequency)

            elements = {
                k:
                list(filter(lambda x: start_time <= x <= end_time, v))
                for (k, v) in elements.items()
            }
            data = data[start_range: min(len(data), end_range + 1)]

        return SignalResponse(**elements, data=data, frequency=frequency)

    async def get_ecd_size(self) -> int:
        return await self.ecd_collection.count_documents({})

    async def prune(self) -> None:
        await self.ecd_collection.delete_many({})
