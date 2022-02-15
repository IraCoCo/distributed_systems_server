from .networkType_entity import NetworkType
from typing import List


class Network:
    def __init__(self, type: NetworkType, accept: str, text: str, address: str, count: int = 0):
        self.type = type
        self.accept = accept
        self.description = text
        self.countInstanses = count
        self.address = address
