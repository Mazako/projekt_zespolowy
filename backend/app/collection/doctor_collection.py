from ..database import database
from ..model.DoctorModel import DoctorModel

doctor_collection = database.get_collection('doctor')


def get_all_doctors() -> list[DoctorModel]:
    return [DoctorModel(**res) for res in doctor_collection.find()]
