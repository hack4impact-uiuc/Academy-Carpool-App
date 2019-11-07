from mongoengine import *
from flask_mongoengine import document
from .base import db
from api.core import Mixin
from api.core import User, Car, Location


class Trip(Document, Mixin):
    driver = ReferenceField("User", required=true)
    origin = ReferenceField("Location", required=true)
    destination = ReferenceField("Location", required=true)
    start_time = StringField(required=true)
    posted_time = DateTimeField(required=true)
    cost = StringField(required=true)
    car = ReferenceField("Car", required=true)
    seats_available = IntField(required=true)
    trunk_space = StringField(required=true)
    passengers = ListField(ReferenceField("User", required=true))