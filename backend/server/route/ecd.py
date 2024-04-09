from datetime import datetime, time
from typing import Annotated

from fastapi import APIRouter, UploadFile, Depends, Query
from fastapi.encoders import jsonable_encoder

from server.database import PyObjectId
from server.model.ecd import SignalType
from server.service.dependency import get_ecd_service, get_patient_service
from server.service.ecd import EcdService
from server.service.patient import PatientService

ecd_router = APIRouter(prefix='/ecd')


@ecd_router.post('/upload', status_code=201)
async def upload_ecd(
        hea: UploadFile,
        mat: UploadFile,
        ecd_service: EcdService = Depends(get_ecd_service)
):
    _id = await ecd_service.save_ecd_file(hea.file, mat.file)
    return {'id: ': _id}


@ecd_router.get('/allFiles', response_model_by_alias=False)
async def get_all_files(ecd_service: EcdService = Depends(get_ecd_service)):
    return list(map(jsonable_encoder, await ecd_service.get_ecd_ids_and_names()))


@ecd_router.get('/signal')
async def get_signal(
        signal_type: SignalType,
        ecd_id: Annotated[PyObjectId, Query(regex=r"^[0-9a-f]{24}$")],
        start: time | None = None,
        end: time | None = None,
        ecd_service: EcdService = Depends(get_ecd_service),
):
    return await ecd_service.get_signal_data(ecd_id, signal_type, start, end)