from typing import BinaryIO, Optional

from bson import ObjectId

from ..database import PyObjectId, EcdCollection
from ..model.ecd import EcdModel
from ..utils.ecd_signal_utils import import_mat


class EcdService:
    def __init__(self, ecd_collection: EcdCollection):
        self.ecd_collection: EcdCollection = ecd_collection

    async def save_ecd_file(self, hea: BinaryIO, mat: BinaryIO) -> PyObjectId:
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
