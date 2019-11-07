from mongoengine import *
from flask_mongoengine import Document
from .base import db
from api.core import Mixin

# from api.models import Cars,Trips


class User(Document, Mixin):
    age = IntField(required=True)
    email = EmailField(required=True)
    name = StringField(required=True)
    phone = StringField(required=True)
    rating = FloatField(required=False)
    venmo_handle = StringField(required=False)

    photo = StringField()
    cars = ListField(ReferenceField("Cars"))
    # past_driver_trips = ListField(ReferenceField("Trips"))
    # past_passenger_trips = ListField(ReferenceField("Trips"))
    # current_trips = ListField(ReferenceField("Trips"))

    def __repr__(self):
        return f"<User {self.name}>"


def getRequiredKeys():
    return ["age", "email", "name", "phone"]

# Returns keys that should not be set on a post request
def getUnpostableKeys():
    return ["past_driver_trips","past_passanger_trips","current_trips"]

def getAllKeys():
    return [
        "age",
        "email",
        "name",
        "phone",
        "rating",
        "venmo_handle",
        "photo",
        "cars",
        "past_driver_trips",
        "past_passanger_trips",
        "current_trips"
    ]
