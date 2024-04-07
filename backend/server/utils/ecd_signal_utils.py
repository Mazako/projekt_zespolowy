import io
from typing import BinaryIO

import scipy

from server.model.ecd import EcdModel, Signal


def import_mat(hea_file: BinaryIO, mat_file: BinaryIO) -> EcdModel:
    mat = scipy.io.loadmat(mat_file)['val']
    hea_file_wrapper = io.TextIOWrapper(hea_file, encoding='utf-8')
    line = hea_file_wrapper.readline()
    frequency = int(line.split(' ')[2])
    values = int(line.split(' ')[1])
    vals = {}
    for i, line in enumerate(hea_file_wrapper.readlines()):
        line = line.strip()
        if i == values:
            break
        mv_normalizer = int(line.split(' ')[2].replace('/mV', ''))
        channel_type = line.split(' ')[8].upper()
        normalized = [value / mv_normalizer for value in mat[i]]
        vals[channel_type] = Signal(data=normalized)
    return EcdModel(**vals, frequency=frequency)
