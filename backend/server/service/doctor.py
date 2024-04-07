from .ecd import EcdService
from ..database import DoctorCollection


class DoctorService:
    def __init__(self, doctor_collection: DoctorCollection, ecd_service: EcdService):
        self.doctor_collection = doctor_collection
        self.ecd_service = ecd_service
