import pytest
from motor.motor_asyncio import AsyncIOMotorClient

from server.Config import config
from server.service.ecd import EcdService


def create_collection() -> EcdService:
    collection = AsyncIOMotorClient(config.db_url) \
        .get_database('ecdHelperDB') \
        .get_collection('ecd')

    return EcdService(collection)


@pytest.mark.asyncio
async def test_import_ecd():
    service = create_collection()
    with open('test_files/JS00001.mat', 'rb') as mat:
        with open('test_files/JS00001.hea', 'rb') as hea:
            _id = await service.save_ecd_file(hea, mat)
            found = await service.find_ecd_by_id(_id)
            assert _id == found.id
