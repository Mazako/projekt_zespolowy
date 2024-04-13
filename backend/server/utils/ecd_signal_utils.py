import io
from datetime import datetime, time, timedelta
from typing import BinaryIO

import scipy

from server.model.ecd import EcdModel, Signal


def import_mat(hea_file: BinaryIO, mat_file: BinaryIO) -> EcdModel:
    mat = scipy.io.loadmat(mat_file)['val']
    hea_file_wrapper = io.TextIOWrapper(hea_file, encoding='utf-8')
    line = hea_file_wrapper.readline()
    header = line.split(' ')
    filename = header[0]
    values = int(header[1])
    frequency = int(header[2])
    size = int(header[3])
    vals = {}
    for i, line in enumerate(hea_file_wrapper.readlines()):
        line = line.strip()
        if i == values:
            break
        mv_normalizer = int(line.split(' ')[2].replace('/mV', ''))
        channel_type = line.split(' ')[8].upper()
        normalized = [value / mv_normalizer for value in mat[i]]
        vals[channel_type] = Signal(data=normalized)
    return EcdModel(**vals, frequency=frequency, filename=filename, size=size)


def convert_to_float_second(t: time) -> float:
    return (t.hour * 3600) + (t.minute * 60) + t.second + (t.microsecond / 1_000_000)


def get_signal_time(signal_length: int, frequency: float) -> time:
    seconds = signal_length / frequency
    delta = timedelta(seconds=seconds)
    t = datetime(2000, 1, 1) + delta
    return t.time()
