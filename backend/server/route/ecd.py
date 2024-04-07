from fastapi import APIRouter, UploadFile, Depends

from server.database import EcdCollection, get_ecd_collection
from server.service import ecd_service

ecd_router = APIRouter(prefix='/ecd')


@ecd_router.post('/upload', status_code=201)
async def upload_ecd(hea: UploadFile, mat: UploadFile, ecd_collection: EcdCollection = Depends(get_ecd_collection)):
    _id = await ecd_collection.save_ecd_file(hea.file, mat.file, ecd_collection)
    return {'id: ': _id}
