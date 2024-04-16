from typing import Annotated

from fastapi import Depends
from motor import motor_asyncio

from backend.server.database import get_ecd_collection, get_doctor_collection, get_patient_collection
from backend.server.service.doctor import DoctorService
from backend.server.service.ecd import EcdService
from backend.server.service.patient import PatientService


async def get_ecd_service(edc_collection: Annotated[motor_asyncio.AsyncIOMotorCollection, Depends(get_ecd_collection)]) -> EcdService:
    return EcdService(edc_collection)


async def get_doctor_service(
        doctor_collection: Annotated[motor_asyncio.AsyncIOMotorCollection, Depends(get_doctor_collection)],
        ecd_service: Annotated[EcdService, Depends(get_ecd_service)]
) -> DoctorService:
    return DoctorService(doctor_collection, ecd_service)


async def get_patient_service(
        patient_collection: Annotated[motor_asyncio.AsyncIOMotorCollection, Depends(get_patient_collection)],
        ecd_service: Annotated[EcdService, Depends(get_ecd_service)]
) -> PatientService:
    return PatientService(patient_collection, ecd_service)
