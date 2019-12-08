from api.models import db, Person
from api.models.Users import User
from api.models.Trips import Trip

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
def test_get_user(client, mongo_proc):
    rs = client.get("/users")
    assert rs.status_code == 200
    ret_dict = rs.json
    assert ret_dict["success"] == True
    assert ret_dict["result"]["users"] == []
    # Create user and test if it's returned
    user = User(
        age=20,
        email="email@domain.com",
        name="Test",
        phone="0123456789",
        venmo_handle="@handle",
    )
    user.save()
    rs = client.get("/users")
    ret_dict = rs.json
    assert len(ret_dict["result"]["users"]) == 1
    assert ret_dict["result"]["users"][0]["age"] == 20
    assert ret_dict["result"]["users"][0]["email"] == "email@domain.com"
    assert ret_dict["result"]["users"][0]["name"] == "Test"
    assert ret_dict["result"]["users"][0]["phone"] == "0123456789"


def test_delete_user(client, mongo_proc):
    # Create user to test on
    user = User(
        age=20,
        email="email@domain.com",
        name="Test",
        phone="0123456789",
        venmo_handle="@handle",
    )
    user.save()
    rs = client.get("/users")
    ret_dict = rs.json
    assert len(ret_dict["result"]["users"]) == 2
    user_id = ret_dict["result"]["users"][0]["_id"]["$oid"]
    rs = client.delete(f"/users/{user_id}")
    rs = client.get("/users")
    ret_dict = rs.json
    assert len(ret_dict["result"]["users"]) == 1


def test_update_user(client, mongo_proc):
    # Create user to test on
    user = User(
        age=20,
        email="email@domain.com",
        name="Test",
        phone="0123456789",
        venmo_handle="@handle",
    )
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


def test_create_user(client, mongo_proc):
    rs = client.post(
        f"/users",
        json={
            "age": 18,
            "email": "email@gmail.com",
            "name": "TEST",
            "phone": "0123456789",
            "venmo_handle": "@handle",
        },
    )
    ret_dict = rs.json
    assert rs.status_code == 201
    rs = client.get("/users")
    ret_dict = rs.json
    assert ret_dict["result"]["users"][2]["age"] == 18
    assert ret_dict["result"]["users"][2]["email"] == "email@gmail.com"
    assert ret_dict["result"]["users"][2]["name"] == "TEST"
    assert ret_dict["result"]["users"][2]["phone"] == "0123456789"


###############################
# CAR TEST
###############################
def test_create_car(client, mongo_proc):
    rs = client.get("/users")
    ret_dict = rs.json
    user_id = ret_dict["result"]["users"][0]["_id"]["$oid"]
    rs = client.post(
        f"/users/{user_id}/cars",
        json={
            "model": "Ford Escape",
            "color": "Black",
            "bad_field": "bad_data",
            "license_plate": "0123",
        },
    )
    ret_dict = rs.json
    assert rs.status_code == 201
    rs = client.get(f"/users/{user_id}/cars")
    ret_dict = rs.json
    assert len(ret_dict["result"]["cars"]) == 1
    print(f"DB: {ret_dict}")
    assert ret_dict["result"]["cars"][0]["color"] == "Black"
    assert ret_dict["result"]["cars"][0]["license_plate"] == "0123"
    assert ret_dict["result"]["cars"][0]["model"] == "Ford Escape"


def test_update_car(client, mongo_proc):
    rs = client.get("/users")
    ret_dict = rs.json
    user_id = ret_dict["result"]["users"][0]["_id"]["$oid"]
    car_id = ret_dict["result"]["users"][0]["cars"][0]["$oid"]
    rs = client.put(
        f"/users/{user_id}/cars/{car_id}",
        json={"model": "Honda Civic", "color": "Purple"},
    )
    ret_dict = rs.json
    assert rs.status_code == 201
    rs = client.get(f"/users/{user_id}/cars")
    ret_dict = rs.json
    assert len(ret_dict["result"]["cars"]) == 1
    assert ret_dict["result"]["cars"][0]["color"] == "Purple"
    assert ret_dict["result"]["cars"][0]["model"] == "Honda Civic"


def test_delete_car(client, mongo_proc):
    rs = client.get("/users")
    ret_dict = rs.json
    user_id = ret_dict["result"]["users"][0]["_id"]["$oid"]
    car_id = ret_dict["result"]["users"][0]["cars"][0]["$oid"]
    rs = client.delete(f"/users/{user_id}/cars/{car_id}")
    ret_dict = rs.json
    assert rs.status_code == 200
    rs = client.get(f"/users/{user_id}/cars")
    ret_dict = rs.json
    assert len(ret_dict["result"]["cars"]) == 0


###########################
# Trips Location Test
###########################
def test_create_trip_location(client, mongo_proc):
    rs = client.get("/trips")
    ret_dict = rs.json
    trip_id = ret_dict["result"]["trips"][0]["_id"]["$oid"]

    rs = client.post(
        f"/trips/{trip_id}/locations",
        json={
            "name": "place",
            "latitude": 0.0,
            "longitude": 0.1,
            "bad_field": "bad_data",
        },
    )

    ret_dict = rs.json
    assert rs.status_code == 201

    rs = client.get(f"/trips/{trip_id}/locations")
    ret_dict = rs.json
    assert len(ret_dict["result"]["locations"]) == 1

    print(f"DB: {ret_dict}")

    assert ret_dict["result"]["locations"][0]["name"] == "place"
    assert ret_dict["result"]["locations"][0]["latitude"] == 0.0
    assert ret_dict["result"]["locations"][0]["longitude"] == 0.1


def test_update_trip_location(client, mongo_proc):
    rs = client.get("/trips")
    ret_dict = rs.json
    trip_id = ret_dict["result"]["trips"][0]["_id"]["$oid"]
    location_id = ret_dict["result"]["trips"][0]["locations"][0]["$oid"]

    rs = client.put(
        f"/trips/{trip_id}/locations/{location_id}",
        json={"name": "Grainger", "latitude": 1.0, "longitude": 1.1,},
    )

    ret_dict = rs.json
    assert rs.status_code == 201

    rs = client.get(f"/trips/{trip_id}/locations")
    ret_dict = rs.json

    assert len(ret_dict["result"]["locations"]) == 1

    assert ret_dict["result"]["locations"][0]["name"] == "Grainger"
    assert ret_dict["result"]["locations"][0]["latitude"] == 1.0
    assert ret_dict["result"]["locations"][0]["longitude"] == 1.1


def test_delete_trip_location(client, mongo_proc):
    rs = client.get("/trips")
    ret_dict = rs.json
    trip_id = ret_dict["result"]["trips"][0]["_id"]["$oid"]
    location_id = ret_dict["result"]["trips"][0]["locations"][0]["$oid"]

    rs = client.delete(f"/trips/{trip_id}/locations/{location_id}")

    ret_dict = rs.json
    assert rs.status_code == 200

    rs = client.get(f"/trips/{trip_id}/locations")
    ret_dict = rs.json
    assert len(ret_dict["result"]["locations"]) == 0


###########################
# Trips Users Test
###########################
def test_create_trip_user(client, mongo_proc):
    rs = client.get("/trips")
    ret_dict = rs.json
    trip_id = ret_dict["result"]["trips"][0]["_id"]["$oid"]

    rs = client.post(
        f"/trips/{trip_id}/users",
        json={
            "age": 20,
            "email": "email@domain.com",
            "name": "test",
            "phone": "0123456789",
            "bad_field": "bad_data",
        },
    )

    ret_dict = rs.json
    assert rs.status_code == 201

    rs = client.get(f"/trips/{trip_id}/users")
    ret_dict = rs.json
    assert len(ret_dict["result"]["users"]) == 1

    print(f"DB: {ret_dict}")

    assert ret_dict["result"]["users"][0]["age"] == 20
    assert ret_dict["result"]["users"][0]["email"] == "email@domain.com"
    assert ret_dict["result"]["users"][0]["name"] == "test"
    assert ret_dict["result"]["users"][0]["phone"] == "0123456789"


def test_update_trip_user(client, mongo_proc):
    rs = client.get("/trips")
    ret_dict = rs.json
    trip_id = ret_dict["result"]["trips"][0]["_id"]["$oid"]
    user_id = ret_dict["result"]["trips"][0]["users"][0]["$oid"]

    rs = client.put(
        f"/trips/{trip_id}/users/{user_id}", json={"age": 21, "phone": "1234567890",},
    )

    ret_dict = rs.json
    assert rs.status_code == 201

    rs = client.get(f"/trips/{trip_id}/users")
    ret_dict = rs.json

    assert len(ret_dict["result"]["users"]) == 1

    assert ret_dict["result"]["users"][0]["age"] == 21
    assert ret_dict["result"]["users"][0]["phone"] == "1234567890"


def test_delete_trip_user(client, mongo_proc):
    rs = client.get("/trips")
    ret_dict = rs.json
    trip_id = ret_dict["result"]["trips"][0]["_id"]["$oid"]
    user_id = ret_dict["result"]["trips"][0]["users"][0]["$oid"]

    rs = client.delete(f"/trips/{trip_id}/users/{user_id}")

    ret_dict = rs.json
    assert rs.status_code == 200

    rs = client.get(f"/trips/{trip_id}/users")
    ret_dict = rs.json
    assert len(ret_dict["result"]["users"]) == 0
