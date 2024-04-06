import logging
from typing import Annotated

import motor.motor_asyncio
from pydantic import BeforeValidator

_logger = logging.getLogger(__name__)

MONGO_URL = 'mongodb://admin:admin@localhost:27017/'

PyObjectId = Annotated[str, BeforeValidator(str)]
_client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
database = _client.get_database('ecdHelperDB')

async def check_db_connection():
    try:
        await database.command('ismaster')
        _logger.info('Connected to database successfully')
    except Exception as e:
        _logger.error('Cannot connect to database: ' + MONGO_URL)
        raise
