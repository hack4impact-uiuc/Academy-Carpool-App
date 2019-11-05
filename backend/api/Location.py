from mongoengine import *
from flask_mongoengine import document
from .base import db
from api.core import Mixin

class Location(Document, Mixin):
    name = StringField(required = true)
    latitude = FloatField(required = true)
    longitude = FloatField(required = true)