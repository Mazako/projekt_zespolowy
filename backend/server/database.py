import sys
from typing import Annotated

import motor.motor_asyncio
from fastapi import Depends
from motor import motor_asyncio
from pydantic import BeforeValidator

from .Config import config

PyObjectId = Annotated[str, BeforeValidator(str)]


class DbSession:
    client: motor_asyncio.AsyncIOMotorClient
    doctor_collection: motor_asyncio.AsyncIOMotorCollection
    ecd_collection: motor_asyncio.AsyncIOMotorCollection
    patient_collection: motor_asyncio.AsyncIOMotorCollection
    __instance = None

    def __new__(cls, *args, **kwargs):
        if cls.__instance is None:
            cls.__instance = super(DbSession, cls).__new__(cls)
            cls.__instance.client = motor_asyncio.AsyncIOMotorClient(config.db_url)
            db = cls.__instance.client.get_database('ecdHelperDB')
            cls.__instance.doctor_collection = db.get_collection('doctor')
            cls.__instance.ecd_collection = db.get_collection('ecd')
            cls.__instance.patient_collection = db.get_collection('patient')
        return cls.__instance


def init_db() -> DbSession:
    return DbSession()


def get_doctor_collection(db: DbSession = Depends(init_db)) -> motor_asyncio.AsyncIOMotorCollection:
    return db.doctor_collection


def get_ecd_collection(db: DbSession = Depends(init_db)) -> motor_asyncio.AsyncIOMotorCollection:
    return db.ecd_collection


def get_patient_collection(db: DbSession = Depends(init_db)) -> motor_asyncio.AsyncIOMotorCollection:
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
