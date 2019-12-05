from mongoengine import *
from flask_mongoengine import Document
from .base import db
from api.core import Mixin
from api.models import Users, Cars, Location


class Trip(Document, Mixin):
    driver = ReferenceField("User", required=True)
    passengers = ListField(ReferenceField("User", required=True))

    origin = ReferenceField("Location", required=True)
    destination = ReferenceField("Location", required=True)
    checkpoints = ListField(ReferenceField("Location"))

    start_date = StringField(required=True)
    start_time = StringField(required=True)
    posted_time = DateTimeField(required=True)

    cost = StringField(required=True)
    car = ReferenceField("Car", required=True)
    seats_available = IntField(required=True)
    trunk_space = StringField(required=True)
    notes = StringField(default="None")

    @staticmethod
    def get_elements():
        return [
            "driver",
            "origin",
            "destination",
            "checkpoints",
            "start_time",
            "start_date",
            "posted_time",
            "cost",
            "car",
            "seats_available",
            "trunk_space",
            "passengers",
            "past_drivers",
            "past_passengers",
            "current_users",
            "notes"
        ]

    @staticmethod
    def get_required_elements():
        return [
            "driver",
            "origin",
            "destination",
            "start_time",
            "start_date",
            "posted_time",
            "cost",
            "car",
            "seats_available",
            "trunk_space"
        ]

    @staticmethod
    def get_reference_keys():
        return ["driver", "passengers", "origin", "destination"]

    def __repr__(self):
        return f"<Trip {self.driver}>"
