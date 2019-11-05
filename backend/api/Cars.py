from mongoengine import *
from flask_mongoengine import document
from .base import db
from api.core import Mixin

class Car(Document, Mixin) {
    color = StringField(required = true)
    model = StringField(required = true)
    year = IntField(required = true)
    license_plate = StringField(required = true)
}