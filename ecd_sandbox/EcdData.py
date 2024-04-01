import numpy as np


class EcdData:
    def __init__(self, frequency, mV_normalize_value, I, II, III, aVR, aVL, aVF, V1, V2, V3, V4, V5, V6):
        self.frequency = frequency
        self.mV_normalize_value = mV_normalize_value
        self.I = I
        self.II = II
        self.III = III
        self.aVR = aVR
        self.aVL = aVL
        self.aVF = aVF
        self.V1 = V1
        self.V2 = V2
        self.V3 = V3
        self.V4 = V4
        self.V5 = V5
        self.V6 = V6
        t = 1 / frequency
        self.time = np.arange(t, len(I) * t + t, t)
