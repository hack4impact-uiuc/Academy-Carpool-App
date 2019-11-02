from mongoengine import *
from flask_mongoengine import document
from .base import db
from api.core import Mixin

class Cars(Document, Mixin):
    year = IntField(required = True)
    model = StringField(required = True)
    color = StringField(required = True)
    liscense_plate = StringField(required = True)