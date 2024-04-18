import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.Config import config
from server.route.ecd import ecd_router

logging.basicConfig(level=logging.INFO)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[config.frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(ecd_router)
