from fastapi import APIRouter, UploadFile, Depends

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
