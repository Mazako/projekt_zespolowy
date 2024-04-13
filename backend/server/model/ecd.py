from datetime import timedelta, time
from enum import Enum
from typing import Annotated

import numpy as np
from pydantic import BaseModel, Field

from server.database import PyObjectId


class Annotations(BaseModel):
    start_time: float
    end_time: float
    comment: str | None = None


class Signal(BaseModel):
    data: list[float]
    annotations: list[str] | None = None


class EcdModel(BaseModel):
    id: Annotated[PyObjectId | None, Field(alias='_id')] = None
    doctor_id: PyObjectId | None = None
    frequency: int
    size: int
    filename: str | None = None
    I: Signal | None = None
    II: Signal | None = None
    III: Signal | None = None
    AVR: Signal | None = None
    AVL: Signal | None = None
    AVF: Signal | None = None
    V1: Signal | None = None
    V2: Signal | None = None
    V3: Signal | None = None
    V4: Signal | None = None
    V5: Signal | None = None
    V6: Signal | None = None


class EcdIdFilename(BaseModel):
    id: Annotated[PyObjectId | None, Field(alias='_id')] = None
    filename: str = ''
    length: time


class SignalType(str, Enum):
    I = 'I'
    II = 'II'
    III = 'III'


class SignalResponse(Signal):
    frequency: int
