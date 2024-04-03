from ecgdetectors import Detectors
import neurokit2 as nk


def find_wqrs(signal, f):
    t = 1 / f
    detector = Detectors(f)
    return [r * t for r in detector.wqrs_detector(signal)]


def find_neurokit(signal, f):
    t = 1 / f
    frame = nk.ecg_peaks(signal, f, 'neurokit')[0]
    frame = frame[frame['ECG_R_Peaks'] == 1]
    return [r * t for r in frame.index.tolist()]


def find_kalidas(signal, f):
    t = 1 / f
    frame = nk.ecg_peaks(signal, f, 'kalidas2017')[0]
    frame = frame[frame['ECG_R_Peaks'] == 1]
    return [r * t for r in frame.index.tolist()]
