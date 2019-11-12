from api.models import db, Person
from api.models.Users import User

# client passed from client - look into pytest for more info about fixtures
# test client api: http://flask.pocoo.org/docs/1.0/api/#test-client
def test_index(client, mongo_proc):
    rs = client.get("/")
    assert rs.status_code == 200


def test_get_person(client, mongo_proc):
    rs = client.get("/persons")

    assert rs.status_code == 200
    ret_dict = rs.json  # gives you a dictionary
    assert ret_dict["success"] == True
    assert ret_dict["result"]["persons"] == []

    # create Person and test whether it returns a person
    temp_person = Person(name="Tim")
    temp_person.save()

    rs = client.get("/persons")
    ret_dict = rs.json
    assert len(ret_dict["result"]["persons"]) == 1
    assert ret_dict["result"]["persons"][0]["name"] == "Tim"


###############################
# USER ENDPOINTS
###############################
def test_get_user(client):
    rs = client.get("/users")

    assert rs.status_code == 200
    ret_dict = rs.json
    assert ret_dict["success"] == True
    assert ret_dict["result"]["users"] == []

    # Create user and test if it's returned
    user = User(age=20, email="email@domain.com", name="Test", phone="0123456789")
    db.session.add(user)
    db.session.commit()

    rs = client.get("/users")
    assert len(ret_dict["result"]["users"]) == 1
    assert ret_dict["result"]["users"][0]["age"] == 20
    assert ret_dict["result"]["users"][0]["email"] == "email@domain.com"
    assert ret_dict["result"]["users"][0]["name"] == "Test"
    assert ret_dict["result"]["users"][0]["phone"] == "0123456789"


def test_delete_user(client):
    # Create user to test on
    user = User(age=20, email="email@domain.com", name="Test", phone="0123456789")
    db.session.add(user)
    db.session.commit()

    rs = client.get("/users")
    ret_dict = rs.json
    assert len(ret_dict["result"]["users"]) == 1

    user_id = ret_dict["result"]["users"][0]["_id"]["$oid"]

    rs = client.delete(f"/users/{user_id}")
    rs = client.get("/users")
    ret_dict = rs.json
    assert len(ret_dict["result"]["users"]) == 0


def test_update_user(client):
    # Create user to test on
    user = User(age=20, email="email@domain.com", name="Test", phone="0123456789")
    db.session.add(user)
    db.session.commit()

    rs = client.get("/users")
    ret_dict = rs.json
    user_id = ret_dict["result"]["users"][0]["_id"]["$oid"]

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
    assert ret_dict["result"]["users"][0]["age"] == 15
    assert ret_dict["result"]["users"][0]["email"] == "newemail@domain.com"
    assert ret_dict["result"]["users"][0]["cars"] == []


def test_create_user(client):
    # Create user to test on
    user = User(age=20, email="email@domain.com", name="Test", phone="0123456789")
    db.session.add(user)
    db.session.commit()

    rs = client.get("/users")
    ret_dict = rs.json
    user_id = ret_dict["result"]["users"][0]["_id"]["$oid"]

    rs = client.post(
        f"/users/{user_id}",
        json={
            "age": 18,
            "email": "email@gmail.com",
            "name": "TEST",
            "phone": "0123456789",
        },
    )

    ret_dict = rs.json
    assert rs.status_code == 201

    rs = client.get("/users")
    ret_dict = rs.json
    assert ret_dict["result"]["users"][0]["age"] == 18
    assert ret_dict["result"]["users"][0]["email"] == "email@gmail.com"
    assert ret_dict["result"]["users"][0]["name"] == "TEST"
    assert ret_dict["result"]["users"][0]["phone"] == "0123456789"
