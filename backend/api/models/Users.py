<<<<<<< HEAD
from mongoengine import *
from flask_mongoengine import Document
from .base import db
from api.core import Mixin


class User(Document, Mixin):
    age = IntField(required=True)
    rating = FloatField(required=True)
    email = EmailField(required=True)
    name = StringField(required=True)
    phone = StringField(required=True)
    venmo_handle = StringField(required=False)

    photo = StringField()
    cars = ListField(ReferenceField(Cars))
    past_driver_trips = ListField(ReferenceField(Trips))
    past_passenger_trips = ListField(ReferenceField(Trips))
    current_trips = ListField(ReferenceField(Trips))

    def __repr__(self):
        return f"<User {self.name}>"
=======
from mongoengine import *
from flask_mongoengine import Document
from .base import db
from api.core import Mixin
from api.models import Cars, Trips


class User(Document, Mixin):
    age = IntField(required=True)
    email = EmailField(required=True)
    name = StringField(required=True)
    phone = StringField(required=True)
    rating = FloatField(required=False)
    venmo_handle = StringField(required=True)

    photo = StringField()
    cars = ListField(ReferenceField("Car"))
    past_driver_trips = ListField(ReferenceField("Trips"))
    past_passenger_trips = ListField(ReferenceField("Trips"))
    current_trips = ListField(ReferenceField("Trips"))

    @staticmethod
    def getRequiredKeys():
        return ["age", "email", "name", "phone", "venmo_handle"]

    @staticmethod
    def getReferenceKeys():
        return ["cars", "past_driver_trips", "past_passanger_trips", "current_trips"]

    @staticmethod
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
            "current_trips",
        ]

    def __repr__(self):
        return f"<User {self.name}>"
>>>>>>> 1f71f82766712d3a6f3cfb29b341b78d46ad649e
