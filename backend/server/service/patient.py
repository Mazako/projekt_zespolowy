from typing import Optional, BinaryIO

from bson import ObjectId
from motor import motor_asyncio

from server.database import PyObjectId
from server.model.patient import PatientBaseModel, PatientEcdModel
from server.service.ecd import EcdService


class PatientService:
    def __init__(self, patient_collection: motor_asyncio.AsyncIOMotorCollection, ecd_service: EcdService):
        self.patient_collection: motor_asyncio.AsyncIOMotorCollection = patient_collection
        self.ecd_service: EcdService = ecd_service

    async def add_patient(self, patient: PatientBaseModel) -> PyObjectId:
        model = PatientEcdModel(**patient.model_dump()).model_dump(exclude_none=True)
        result = await self.patient_collection.insert_one(model)
        return PyObjectId(result.inserted_id)

    async def find_patient_by_id(self, patient_id: PyObjectId) -> Optional[PatientEcdModel]:
        result = await self.patient_collection.find_one(
            {'_id': ObjectId(patient_id)}
        )
        if result is not None:
            return PatientEcdModel(**result)
        else:
            return None

    async def upload_ecd(self, hea: BinaryIO, mat: BinaryIO, patient_id: PyObjectId) -> PyObjectId:
        ecd_id = await self.ecd_service.save_ecd_file(hea, mat)
        await self.patient_collection.update_one(
            filter={
                '_id': ObjectId(patient_id)
            },
            update={
                '$push': {'ecd': ObjectId(ecd_id)}
            }
        )
        return ecd_id
