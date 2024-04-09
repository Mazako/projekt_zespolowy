import logging
import sys
from typing import Annotated

import motor.motor_asyncio
from fastapi import Depends
from pydantic import BeforeValidator

from .Config import config

PyObjectId = Annotated[str, BeforeValidator(str)]


class DoctorCollection(motor.motor_asyncio.AsyncIOMotorCollection):
    pass


class EcdCollection(motor.motor_asyncio.AsyncIOMotorCollection):
    pass


class PatientCollection(motor.motor_asyncio.AsyncIOMotorCollection):
    pass


class DbCollections:
    def __init__(
            self,
            doctor_collection,
            ecd_collection,
            patient_collection
    ):
        self.doctor_collection: DoctorCollection = doctor_collection
        self.ecd_collection: EcdCollection = ecd_collection
        self.patient_collection: PatientCollection = patient_collection


def init_db() -> DbCollections:
    client = motor.motor_asyncio.AsyncIOMotorClient(config.db_url)
    database = client.get_database('ecdHelperDB')
    return DbCollections(
        database.get_collection('doctor'),
        database.get_collection('ecd'),
        database.get_collection('patient')
    )


def get_doctor_collection(db: DbCollections = Depends(init_db)) -> DoctorCollection:
    return db.doctor_collection


def get_ecd_collection(db: DbCollections = Depends(init_db)) -> EcdCollection:
    return db.ecd_collection


def get_patient_collection(db: DbCollections = Depends(init_db)) -> PatientCollection:
    return db.patient_collection

async def check_db_connection():
    client = motor.motor_asyncio.AsyncIOMotorClient(config.db_url)
    print('Checking database connection...')
    try:
        await client.list_database_names()
        print('Database connected succesfully')
    except Exception as e:
        print('Cannot connect to database. check DB connection. Stacktrace:')
        print(e)
        sys.exit(1)
