# conftest.py is used by pytest to share fixtures
# https://docs.pytest.org/en/latest/fixture.html#conftest-py-sharing-fixture-functions
import os
import tempfile
import time
import pytest
from unittest import mock

from flask_migrate import Migrate

from api import create_app

# We spin up a temporary postgres instance
# in which we inject it into the app
@pytest.fixture(scope="session")
def client():
    config_dict = {"DEBUG": True}
    app = create_app(config_dict)
    app.app_context().push()

    time.sleep(2)
    from api.models import db

    # for test client api reference
    # http://flask.pocoo.org/docs/1.0/api/#test-client
    client = app.test_client()
    yield client
