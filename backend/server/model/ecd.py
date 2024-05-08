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
    bpm: float | None = None
    R: list[int | time] | None = None
    P: list[int | time] | None = None
    Q: list[int | time] | None = None
    S: list[int | time] | None = None
    T: list[int | time] | None = None


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
    AVR = 'AVR'
    AVL = 'AVL'
    AVF = 'AVF'
    V1 = 'V1'
    V2 = 'V2'
    V3 = 'V3'
    V4 = 'V4'
    V5 = 'V5'
    V6 = 'V6'


class SignalResponse(BaseModel):
    frequency: int
    signals: dict[SignalType, Signal]


class SignalDomain(str, Enum):
    numeric = 'numeric'
    time = 'time'


class Verdict(str, Enum):
    bradycardia = 'bradycardia'
    tachycardia = 'tachycardia'
    normal = 'normal'
    dunno = 'cannot determine'


class ConditionAnalyzeResponse(BaseModel):
    I_p_before_qrs: bool
    II_p_before_qrs: bool
    AVR_p_before_qrs: bool
    I_p_positive: bool | None = None
    II_p_positive: bool | None = None
    AVR_p_negative: bool | None = None
    bpm: float | None = None
    verdict: Verdict
