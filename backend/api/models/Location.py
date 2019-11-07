from mongoengine import *
from flask_mongoengine import Document
from .base import db
from api.core import Mixin


class Location(Document, Mixin):
    name = StringField(required=true)
    latitude = FloatField(required=true)
    longitude = FloatField(required=true)

    def __repr__(self):
        return f"<Location {self.name}>"

def get_elements():
    return ["name", "latitude", "longitude"]