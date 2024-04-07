import logging
from typing import Annotated

import motor.motor_asyncio
from fastapi import Depends
from pydantic import BeforeValidator

from .Config import config

_logger = logging.getLogger(__name__)

PyObjectId = Annotated[str, BeforeValidator(str)]
DoctorCollection = motor.motor_asyncio.AsyncIOMotorCollection
EcdCollection = motor.motor_asyncio.AsyncIOMotorCollection


class DbCollections:
    def __init__(self, doctor_collection: DoctorCollection, ecd_collection: EcdCollection):
        self.doctor_collection: DoctorCollection = doctor_collection
        self.ecd_collection: EcdCollection = ecd_collection


async def init_db() -> DbCollections:
    client = motor.motor_asyncio.AsyncIOMotorClient(config.db_url)
    database = client.get_database('ecdHelperDB')
    return DbCollections(
        database.get_collection('doctor'),
        database.get_collection('ecd')
    )


async def get_doctor_collection(db: DbCollections = Depends(init_db)) -> DoctorCollection:
    return db.doctor_collection


async def get_ecd_collection(db: DbCollections = Depends(init_db)) -> EcdCollection:
    return db.ecd_collection

