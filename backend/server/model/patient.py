from datetime import date
from enum import Enum
from typing import Annotated

from pydantic import BaseModel, Field

from backend.server.database import PyObjectId


class Gender(str, Enum):
    male = 'male'
    female = 'female'


class Address(BaseModel):
    country: str
    city: str
    street: str
    house_no: str


class PatientBaseModel(BaseModel):
    first_name: str
    last_name: str
    pesel: str
    gender: Gender
    date_of_birth: date
    address: Address


class PatientModel(PatientBaseModel):
    id: Annotated[PyObjectId | None, Field(alias='_id')] = None


class PatientEcdModel(PatientModel):
    ecd: list[PyObjectId] = []
    snomed_codes: list[str] = []
