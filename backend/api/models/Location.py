from mongoengine import *
from flask_mongoengine import Document
from .base import db
from api.core import Mixin


class Location(Document, Mixin):
    name = StringField(required=True)
    latitude = FloatField(required=True)
    longitude = FloatField(required=True)

    @staticmethod
    def get_elements():
        return ["name", "latitude", "longitude"]
    
    def __repr__(self):
        return f"<Location {self.name}>"