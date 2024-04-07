import pytest
from motor.motor_asyncio import AsyncIOMotorClient

from server.Config import config
from server.database import EcdCollection
import server.service.ecd_service as service


def create_collection() -> EcdCollection:
    return AsyncIOMotorClient(config.db_url) \
        .get_database('ecdHelperDB') \
        .get_collection('ecd')

@pytest.mark.asyncio
async def test_import_ecd():
    collection = create_collection()
    with open('test_files/JS00001.mat', 'rb') as mat:
        with open('test_files/JS00001.hea', 'rb') as hea:
            _id = await service.save_ecd_file(hea, mat, collection)
            found = await service.find_ecd_by_id(_id, collection)
            assert _id == found.id
