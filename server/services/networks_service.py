from typing import Optional, List
from ..entities.network_entity import Network
from ..entities.exception_entity import NetworkNotWorkError
from ..entities.networkType_entity import NetworkType


class NetworkService:

    @staticmethod
    def get_all_networks() -> List[Network]:
        # запрос к докеру на получение рабочих сервисов
        return



