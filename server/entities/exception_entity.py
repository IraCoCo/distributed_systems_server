from .networkType_entity import NetworkType


class NetworkNotWorkError(Exception):
    """Исключение возникает из-за отсутсвия поднятого сервера нейронной сети.

    Атрибуты:
        type: тип нейронной сети, вызвавшый ошибку
        message: объяснение ошибки
    """

    def __init__(self, type: NetworkType, message="Данная нейронная сеть недоступна"):
        self.type = type
        self.message = message
        super().__init__(self.message)

    # переопределяем метод '__str__'
    def __str__(self):
        return f'{self.type} -> {self.message}'
