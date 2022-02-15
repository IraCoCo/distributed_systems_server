from enum import Enum


class NetworkType(str, Enum):
    yolo = "YOLO"
    audio_classification = "AUDIO"
    tmp = "TMP"
