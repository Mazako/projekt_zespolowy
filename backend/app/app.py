from fastapi import FastAPI
from database import check_db_connection
import logging
logging.basicConfig(level=logging.INFO)

app = FastAPI()


@app.on_event('startup')
async def check_db():
    await check_db_connection()
    pass
