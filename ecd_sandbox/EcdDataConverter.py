import scipy
import numpy as np
from EcdData import EcdData


def import_mat(hea_file_path, mat_file_path):
    mat = scipy.io.loadmat(mat_file_path)['val']
    with open(hea_file_path, 'r') as header:
        line = header.readline()
        frequency = int(line.split(' ')[2])
        values = int(line.split(' ')[1])
        vals = {}
        for i, line in enumerate(header.readlines()):
            line = line.strip()
            if i == values:
                break
            mv_normalizer = int(line.split(' ')[2].replace('/mV', ''))
            channel_type = line.split(' ')[8].upper()
            normalized = np.array([value / mv_normalizer for value in mat[i]])
            vals[channel_type] = normalized
        return EcdData(frequency, vals['I'], vals['II'], vals['III'],
                       vals['AVR'], vals['AVL'], vals['AVF'],
                       vals['V1'], vals['V2'], vals['V3'], vals['V4'], vals['V5'], vals['V6'])
