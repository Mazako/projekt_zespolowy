import io
from typing import BinaryIO, Optional
from bson import ObjectId

import scipy

from ..database import PyObjectId, EcdCollection
from ..model.ecd import EcdModel, Signal


async def save_ecd_file(hea: BinaryIO, mat: BinaryIO, ecd_collection: EcdCollection) -> PyObjectId:
    ecd = import_mat(hea, mat)
    result = await ecd_collection.insert_one(ecd.model_dump(by_alias=True, exclude_unset=True))
    return PyObjectId(result.inserted_id)


async def find_ecd_by_id(ecd_id: PyObjectId, ecd_collection: EcdCollection) -> Optional[EcdModel]:
    result = await ecd_collection.find_one(
        {'_id': ObjectId(ecd_id)}
    )
    if result is not None:
        return EcdModel(**result)
    return None


def import_mat(hea_file: BinaryIO, mat_file: BinaryIO) -> EcdModel:
    mat = scipy.io.loadmat(mat_file)['val']
    hea_file_wrapper = io.TextIOWrapper(hea_file, encoding='utf-8')
    line = hea_file_wrapper.readline()
    frequency = int(line.split(' ')[2])
    values = int(line.split(' ')[1])
    vals = {}
    for i, line in enumerate(hea_file_wrapper.readlines()):
        line = line.strip()
        if i == values:
            break
        mv_normalizer = int(line.split(' ')[2].replace('/mV', ''))
        channel_type = line.split(' ')[8].upper()
        normalized = [value / mv_normalizer for value in mat[i]]
        vals[channel_type] = Signal(data=normalized)
    return EcdModel(**vals, frequency=frequency)
