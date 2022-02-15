from typing import Optional, List
from ..entities.network_entity import Network
from ..entities.exception_entity import NetworkNotWorkError
from ..entities.networkType_entity import NetworkType


class NetworkService:

    @staticmethod
    def get_all_networks() -> List[Network]:
        yolo = Network(NetworkType.yolo, "image", "Обработка картинок YOLO", count=1,
                       address="http://172.27.183.55:62225/predict")
        audio = Network(NetworkType.audio_classification, "audio", "Обработка музыки. Анализ инструментов", count=1,
                        address="http://172.27.183.55:62235/classify")
        tmp = Network(NetworkType.tmp, "*", "тест", count=0, address="http://:/")
        # запрос к докеру на получение рабочих сервисов
        return [yolo, audio, tmp]
