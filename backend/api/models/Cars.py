from mongoengine import *
from flask_mongoengine import Document
from .base import db
from api.core import Mixin


class Car(Document, Mixin):
    year = IntField(required=False)
    model = StringField(required=True)
    color = StringField(required=True)
    license_plate = StringField(required=True, max_length=4)

    @staticmethod
    def getRequiredKeys():
        return ["model", "color", "license_plate"]
    
    @staticmethod
    def getAllKeys():
        return ["model", "color", "license_plate", "year"]

    def __repr__(self):
        return f"<Car {self.license_plate}>"
