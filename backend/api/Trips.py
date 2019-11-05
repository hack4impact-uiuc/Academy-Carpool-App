from mongoengine import *
from flask_mongoengine import document
from .base import db
from api.core import Mixin

class Trip(Document, Mixin) {
    driver = ReferenceField(User, required = true)
    trip_id = IntField(required = true)
    origin = ReferenceField(Location, required = true)
    destination = ReferenceField(Location, required = true)
    start_date_time = DateTimeField(required = true)
    posted_date_time = DateTimeField(required = true)
    cost = StringField(required = true)
    car = ReferenceField(Car, required = true)
    seats_available = IntField(required = true)
    trunk_space_sq_ft = FloatField(required = true)
    passengers = ListField(ReferenceField(User, required = true))
}