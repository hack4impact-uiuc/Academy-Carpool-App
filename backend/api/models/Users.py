from mongoengine import *
from flask_mongoengine import Document
from .base import db
from api.core import Mixin

class User(Document, Mixin):
    age = IntField(required = True)
    rating = FloatField(required = True)
    email = EmailField(required = True)
    name = StringField(required = True)
    phone = StringField(required = True)
    venmo_handle = StringField(required = False)
    
    photo = StringField()
    cars = ListField(ReferenceField(Cars))
    past_driver_trips = ListField(ReferenceField(Trips))
    past_passenger_trips = ListField(ReferenceField(Trips))
    current_trips = ListField(ReferenceField(Trips))

    def __repr__(self):
        return f"<User {self.name}>"