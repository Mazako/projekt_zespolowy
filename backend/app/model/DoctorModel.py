from pydantic import BaseModel, Field, EmailStr
from ..database import PyObjectId


class DoctorModel(BaseModel):
    id: PyObjectId = Field(alias='_id')
    first_name: str
    last_name: str
    email: EmailStr
    hash_password: str
