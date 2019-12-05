from mongoengine import *
<<<<<<< HEAD
from flask_mongoengine import document
=======
from flask_mongoengine import Document
>>>>>>> 1f71f82766712d3a6f3cfb29b341b78d46ad649e
from .base import db
from api.core import Mixin


<<<<<<< HEAD
class Cars(Document, Mixin):
=======
class Car(Document, Mixin):
>>>>>>> 1f71f82766712d3a6f3cfb29b341b78d46ad649e
    year = IntField(required=False)
    model = StringField(required=True)
    color = StringField(required=True)
    license_plate = StringField(required=True)

<<<<<<< HEAD
=======
    @staticmethod
    def getRequiredKeys():
        return ["model", "color", "license_plate"]

    @staticmethod
    def getAllKeys():
        return ["model", "color", "license_plate", "year"]

>>>>>>> 1f71f82766712d3a6f3cfb29b341b78d46ad649e
    def __repr__(self):
        return f"<Car {self.license_plate}>"
