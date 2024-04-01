import numpy as np
import scipy
# https://hooman650.github.io/ECG-QRS.html

def detect(signal, f):
    bandpass = _bandpass_filter(signal, f)
    diff = _differ(bandpass)
    ma = _moving_average(diff, f)
    return _peaks(ma, f)


def _bandpass_filter(signal, f):
    W1 = 5 * 2 / f
    W2 = 15 * 2 / f
    b, a = scipy.signal.butter(4, [W1, W2], 'bandpass')
    return scipy.signal.filtfilt(b, a, np.transpose(signal))


def _differ(signal):
    signal_df = np.diff(signal)
    sq = np.power(signal_df, 2)
    return np.insert(sq, 0, sq[0])


def _moving_average(signal, N=30):
    window = np.ones((1, N)) / N
    return np.convolve(np.squeeze(signal), np.squeeze(window))


def _peaks(signal, f):
    peaks, _ = scipy.signal.find_peaks(signal, height=np.mean(signal), distance=round(f * 0.200))
    return peaks
