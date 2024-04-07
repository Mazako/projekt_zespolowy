from ..database import DoctorCollection
from ..model.DoctorModel import DoctorModel


def get_all_doctors(doctor_collection: DoctorCollection) -> list[DoctorModel]:
    return [DoctorModel(**res) for res in doctor_collection.find()]
