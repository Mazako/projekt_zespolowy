import pytest
from testcontainers.mongodb import MongoDbContainer

from backend.server.Config import config


@pytest.fixture(autouse=True, scope='session')
def setup():
    container = MongoDbContainer().start()
    config.db_url = container.get_connection_url()

