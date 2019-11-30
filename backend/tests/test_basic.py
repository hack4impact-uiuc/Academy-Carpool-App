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


# Trips Endpoints
def test_get_trip(client, mongo_proc):
    rs = client.get("/trips")

    assert rs.status_code == 200
    ret_dict = rs.json
    assert ret_dict["success"] == True
    assert ret_dict["result"]["trips"] == []

    # Create trip and test if it's returned
    driver_temp = User(
        age=20,
        email="email@domain.com",
        name="Test",
        phone="0123456789",
    )
    driver_temp.save()
    origin_temp = Location(
        name="Start",
        latitude=0.0,
        longitude=0.1,
    )
    origin_temp.save()
    destination_temp = Location(
        name="End",
        latitude=0.2,
        longitude=0.3,
    )
    destination_temp.save()
    car_temp = Car(
        model="RX350",
        color="white",
        license_plate="TEST",
    )
    car_temp.save()

    trip = Trip(
        driver=driver_temp,
        origin=origin_temp,
        destination=destination_temp,
        start_time="12:01 PM",
        posted_time="2014-02-10T10:50:42.389Z",
        cost="$5",
        car=car_temp,
        seats_available=3,
        trunk_space="2 backpacks/person",
    )
    trip.save()

    rs = client.get("/trips")
    ret_dict = rs.json
    assert len(ret_dict["result"]["trips"]) == 1

    assert ret_dict["result"]["trips"][0]["driver"]["age"] == 20
    assert ret_dict["result"]["trips"][0]["driver"]["email"] == "email@domain.com"
    assert ret_dict["result"]["trips"][0]["driver"]["name"] == "Test"
    assert ret_dict["result"]["trips"][0]["driver"]["phone"] == "0123456789"

    assert ret_dict["result"]["trips"][0]["origin"]["name"] == "Start"
    assert ret_dict["result"]["trips"][0]["driver"]["latitude"] == 0.0
    assert ret_dict["result"]["trips"][0]["driver"]["longitude"] == 0.1

    assert ret_dict["result"]["trips"][0]["destination"]["name"] == "End"
    assert ret_dict["result"]["trips"][0]["destination"]["latitude"] == 0.2
    assert ret_dict["result"]["trips"][0]["destination"]["longitude"] == 0.3

    assert ret_dict["result"]["trips"][0]["start_time"] == "12:01 PM"
    assert ret_dict["result"]["trips"][0]["posted_time"] == "2014-02-10T10:50:42.389Z"
    assert ret_dict["result"]["trips"][0]["cost"] == "$5"

    assert ret_dict["result"]["trips"][0]["car"]["model"] == "RX350"
    assert ret_dict["result"]["trips"][0]["car"]["color"] == "white"
    assert ret_dict["result"]["trips"][0]["car"]["license_plate"] == "TEST"

    assert ret_dict["result"]["trips"][0]["seats_available"] == 3
    assert ret_dict["result"]["trips"][0]["trunk_space"] == "2 backpacks/person"


def test_delete_trip(client, mongo_proc):
    # Create trip to test on
    driver_temp = User(
        age=20,
        email="email@domain.com",
        name="Test",
        phone="0123456789",
    )
    driver_temp.save()
    origin_temp = Location(
        name="Start",
        latitude=0.0,
        longitude=0.1,
    )
    origin_temp.save()
    destination_temp = Location(
        name="End",
        latitude=0.2,
        longitude=0.3,
    )
    destination_temp.save()
    car_temp = Car(
        model="RX350",
        color="white",
        license_plate="TEST",
    )
    car_temp.save()

    trip = Trip(
        driver=driver_temp,
        origin=origin_temp,
        destination=destination_temp,
        start_time="12:01 PM",
        posted_time="2014-02-10T10:50:42.389Z",
        cost="$5",
        car=car_temp,
        seats_available=3,
        trunk_space="2 backpacks/person",
    )
    trip.save()

    rs = client.get("/trips")
    ret_dict = rs.json
    assert len(ret_dict["result"]["trips"]) == 2

    trip_id = ret_dict["result"]["trips"][0]["_id"]["$oid"]

    rs = client.delete(f"/trips/{trip_id}")
    rs = client.get("/trips")
    ret_dict = rs.json
    assert len(ret_dict["result"]["trips"]) == 1


def test_update_trip(client, mongo_proc):
    # Create trip to test on
    driver_temp = User(
        age=20,
        email="email@domain.com",
        name="Test",
        phone="0123456789",
    )
    driver_temp.save()
    origin_temp = Location(
        name="Start",
        latitude=0.0,
        longitude=0.1,
    )
    origin_temp.save()
    destination_temp = Location(
        name="End",
        latitude=0.2,
        longitude=0.3,
    )
    destination_temp.save()
    car_temp = Car(
        model="RX350",
        color="white",
        license_plate="TEST",
    )
    car_temp.save()

    trip = Trip(
        driver=driver_temp,
        origin=origin_temp,
        destination=destination_temp,
        start_time="12:01 PM",
        posted_time="2014-02-10T10:50:42.389Z",
        cost="$5",
        car=car_temp,
        seats_available=3,
        trunk_space="2 backpacks/person",
    )
    trip.save()

    rs = client.get("/trips")
    ret_dict = rs.json
    trip_id = ret_dict["result"]["trips"][1]["_id"]["$oid"]

    rs = client.put(
        f"/trips/{trip_id}",
        json={
            "cost": "$10",
            "seats_available": 2,
            "origin": (
                "latitude": 4.0
            ), # Location cannot be updated on put
            "badKey": "badValue",  # Bad values should be ignored
        },
    )

    ret_dict = rs.json
    assert rs.status_code == 201

    rs = client.get("/trips")
    ret_dict = rs.json

    assert ret_dict["result"]["trips"][1]["cost"] == "$10"
    assert ret_dict["result"]["trips"][1]["seats_available"] == 2
    assert ret_dict["result"]["trips"][1]["origin"]["latitude"] == 0.0


def test_create_trip(client, mongo_proc):
    rs = client.post(
        f"/trips",
        json={
            "driver": {
                "age": 20,
                "email": "email@domain.com",
                "name": "Test",
                "phone": "0123456789",
            },
            "origin": {
                "name": "Start",
                "latitude": 0.0,
                "longitude": 0.1,
            },
            "destination": {
                "name": "End",
                "latitude": 0.2,
                "longitude": 0.3,
            },
            "start_time": "12:01 PM",
            "posted_time": "2014-02-10T10:50:42.389Z",
            "cost": "$5",
            "car": {
                "model": "RX350",
                "color": "white",
                "license_plate": "TEST",
            },
            "seats_available": 3,
            "trunk_space": "2 backpacks/person",
        },
    )

    ret_dict = rs.json
    assert rs.status_code == 201

    rs = client.get("/trips")
    ret_dict = rs.json
    assert ret_dict["result"]["trips"][2]["driver"]["age"] == 20
    assert ret_dict["result"]["trips"][2]["driver"]["email"] == "email@domain.com"
    assert ret_dict["result"]["trips"][2]["driver"]["name"] == "Test"
    assert ret_dict["result"]["trips"][2]["driver"]["phone"] == "0123456789"

    assert ret_dict["result"]["trips"][2]["origin"]["name"] == "Start"
    assert ret_dict["result"]["trips"][2]["origin"]["latitude"] == 0.0
    assert ret_dict["result"]["trips"][2]["origin"]["longitude"] == 0.1

    assert ret_dict["result"]["trips"][2]["destination"]["name"] == "End"
    assert ret_dict["result"]["trips"][2]["destination"]["latitude"] == 0.2
    assert ret_dict["result"]["trips"][2]["destination"]["longitude"] == 0.3

    assert ret_dict["result"]["trips"][2]["start_time"] == "12:01 PM"
    assert ret_dict["result"]["trips"][2]["posted_time"] == "2014-02-10T10:50:42.389Z"
    assert ret_dict["result"]["trips"][2]["cost"] == "$5"

    assert ret_dict["result"]["trips"][2]["car"]["model"] == "RX350"
    assert ret_dict["result"]["trips"][2]["car"]["color"] == "white"
    assert ret_dict["result"]["trips"][2]["car"]["license_plate"] == "TEST"

    assert ret_dict["result"]["trips"][2]["seats_available"] == 3
    assert ret_dict["result"]["trips"][2]["trunk_space"] == "2 backpacks/person"



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
    user = User(age=20, email="email@domain.com", name="Test", phone="0123456789")
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
    user = User(age=20, email="email@domain.com", name="Test", phone="0123456789")
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


def test_create_user(client, mongo_proc):
    rs = client.post(
        f"/users",
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
