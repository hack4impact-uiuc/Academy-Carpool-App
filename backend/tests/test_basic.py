from api.models import db, Person
from api.models.Users import User

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client
def test_index(client):
    rs = client.get("/")
    assert rs.status_code == 200


###############################
# USER ENDPOINTS
###############################
def test_update_user(client):
    # Create user to test on
    user = User(age=20, email="email@domain.com", name="Test", phone="0123456789")
    user.save()

    rs = client.get("/users")
    ret_dict = rs.json
    user_id = ret_dict["result"]["users"][1]["_id"]["$oid"]

    rs = client.put(
        f"/users/{user_id}",
        json={
            "age": 15,
            "email": "newemail@domain.com",
            "cars": "badData",  # Cars cannot be updated on put
            "badKey": "badValue",  # Bad values should be ignored
        },
    )

    ret_dict = rs.json
    assert rs.status_code == 201

    rs = client.get("/users")
    ret_dict = rs.json

    assert ret_dict["result"]["users"][1]["age"] == 15
    assert ret_dict["result"]["users"][1]["email"] == "newemail@domain.com"
    assert ret_dict["result"]["users"][1]["cars"] == []
