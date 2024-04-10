from motor import motor_asyncio

from .ecd import EcdService


class DoctorService:
    def __init__(self, doctor_collection: motor_asyncio.AsyncIOMotorCollection, ecd_service: EcdService):
        self.doctor_collection = doctor_collection
        self.ecd_service = ecd_service
