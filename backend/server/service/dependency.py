from typing import Annotated

from fastapi import Depends

from server.database import EcdCollection, get_ecd_collection, DoctorCollection, get_doctor_collection, \
    PatientCollection, get_patient_collection
from server.service.doctor import DoctorService
from server.service.ecd import EcdService
from server.service.patient import PatientService


async def get_ecd_service(edc_collection: Annotated[EcdCollection, Depends(get_ecd_collection)]) -> EcdService:
    return EcdService(edc_collection)


async def get_doctor_service(
        doctor_collection: Annotated[DoctorCollection, Depends(get_doctor_collection)],
        ecd_service: Annotated[EcdService, Depends(get_ecd_service)]
) -> DoctorService:
    return DoctorService(doctor_collection, ecd_service)


async def get_patient_service(
        patient_collection: Annotated[PatientCollection, Depends(get_patient_collection)],
        ecd_service: Annotated[EcdService, Depends(get_ecd_service)]
) -> PatientService:
    return PatientService(patient_collection, ecd_service)
