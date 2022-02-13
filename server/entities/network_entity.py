from .networkType_entity import NetworkType
from typing import List


class Network:
    def __init__(self, type: NetworkType, text: str, address: List[str], count: int = 0):
        self.type = type
        self.description = text
        self.count_instanses = count
        self.listAddress = address