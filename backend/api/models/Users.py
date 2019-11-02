from mongoengine import *
from flask_mongoengine import document
from .base import db
from api.core import Mixin

class User(Document, Mixin):
    user_id = IntField(required = True)
    past_trips = IntField(required = True)
    age = IntField(required = True)
    rating = FloatField(required = True)
    email = EmailField(required = True)
    name = StringField(required = True)
    phone = StringField(required = True)
    venmo_handle = StringField(required = True)
    
    photo = StringField()
    cars = ListField(ReferenceField(Cars))
    past_driver_trips = ListField(ReferenceField(Trips))
    past_passenger_trips = ListField(ReferenceField(Trips))
    current_trips = ListField(ReferenceField(Trips))

