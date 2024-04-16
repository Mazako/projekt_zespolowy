import logging

from fastapi import FastAPI

from backend.server.route.ecd import ecd_router

logging.basicConfig(level=logging.INFO)

app = FastAPI()

app.include_router(ecd_router)
