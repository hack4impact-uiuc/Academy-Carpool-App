from mongoengine import*
from flask_mongoengine
import document
from.base import db
from api.core import Mixin

class User(Document, Mixin) {
    name = StringField(required = true)
    phone = StringField(required = true)
    email = EmailField(required = true)
    venmo_handle = StringField(required = true)
    photo = StringField()
}