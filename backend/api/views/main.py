from flask import Blueprint, request, jsonify
from api.models import db, Person, Email, CensusResponse
from api.core import create_response, serialize_list, logger

from api.models.Trips import Trip
from api.models import db, Trips, Location, CensusResponse

from .populate_db import parse_census_data
from .web_scrap import extract_data_links

# Kelly's code

main = Blueprint("main", __name__)  # initialize blueprint

# function that is called when you visit /
@main.route("/")
def index():
    # you are now in the current application context with the main.route decorator
    # access the logger with the logger from api.core and uses the standard logging module
    # try using ipdb here :) you can inject yourself
    logger.info("Hello World!")
    return "Hello World!"


# function that is called when you visit /persons
@main.route("/persons", methods=["GET"])
def get_persons():
    persons = Person.objects()
    return create_response(data={"persons": persons})


# function that is called when you visit /census_response
@main.route("/census_response", methods=["GET"])
def get_census_response():
    responses = CensusResponse.objects()  # CURRENTLY DOESNT HAVE DATE BUT USE IT LATER
    response_rates = []
    has_date = "date" in request.args

    if has_date:
        date = request.args["date"]
        year = date[-4:]
    else:
        year = request.args["year"]

    for resp in responses:
        if has_date:
            rate = resp.rates[year][date]
        else:
            rate = resp.rates[year]
        id_and_rate = {"tract_id": resp.tract_id, "rate": rate}
        response_rates.append(id_and_rate)

    return create_response(data={"response_rates": response_rates})


# POST request for /persons
@main.route("/persons", methods=["POST"])
def create_person():
    data = request.get_json()

    logger.info("Data recieved: %s", data)
    if "name" not in data:
        msg = "No name provided for person."
        logger.info(msg)
        return create_response(status=422, message=msg)
    if "emails" not in data:
        msg = "No email provided for person."
        logger.info(msg)
        return create_response(status=422, message=msg)

    #  create MongoEngine objects
    new_person = Person(name=data["name"])
    for email in data["emails"]:
        email_obj = Email(email=email)
        new_person.emails.append(email_obj)
    new_person.save()

    return create_response(
        message=f"Successfully created person {new_person.name} with id: {new_person.id}"
    )


@main.route("/census_response", methods=["POST"])
def populate_db():
    data = request.get_json()
    if "parent_link" not in data:
        msg = "No parent link."
        logger.info(msg)
        return create_response(status=442, message=msg)

    parent_link = data["parent_link"]
    logger.info("Populating Census Response Data from {}".format(parent_link))

    files = extract_data_links(parent_link)

    parse2000 = True
    for file, date in files.items():
        responses = parse_census_data(file, date, parse2000)
        parse2000 = False
        for r in responses:
            existing = CensusResponse.objects(tract_id=r.tract_id)
            if len(existing) > 0:
                existing = existing[0]
                existing.update(r)
                existing.save()
            else:
                r.save()

    return create_response(
        message=f"Successfully added {len(responses)} new Census Responses"
    )



#CARPOOL APP CODE:

# function that is called when you visit /trips
@main.route("/trips", methods=["GET"])
def get_trips():
    trips = Trips.objects()
    return create_response(data={"trips": trips})

# function that is called when you visit /trips
@main.route("/trips", methods=["POST"])
def create_trip():
    info = request.get_json()
    logger.info(f"Received info {info}.")

    for key in Trips.get_elements():
        if key not in info:
            logger.info(f"Trip not created, missing field '{key}.'")
            return create_response(status=442, message=f"{key} not in info.")

    driver = info["driver"]
    origin = info["origin"]
    destination = info["destination"]
    start_time = info["start_time"]
    posted_time = info["posted_time"]
    cost = info["cost"]
    car = info["car"]
    seats_available = info["seats_available"]
    trunk_space = info["trunk_space"]
    passengers = info["passengers"]

    trip = Trip(driver = driver, origin = origin, destination = destination, start_time = start_time,
    posted_time = posted_time, cost = cost, car = car, seats_available = seats_available,
    trunk_space = trunk_space, passengers = passengers)
    trip.save()

    return create_response(message=f"Successfully created Trip {trip.name} with id {trip.id}.", status=201)

# function that identifies the trip based on its id (used in the latter two endpoints)
def get_trip_by_id(trip_id):
    trip = Trip.objects(id = trip_id)
    
    if (not trip):
        logger.info(f"There are no trips with id {trip_id}.")
        return None

    return trip.get(id = trip_id)

# function that is called when you visit /trips/<id>
@main.route("/trips/<id>", methods=["PUT"])
def update_trip(id):
    info = request.get_json
    logger.info(f"Recieved info {info}.")

    trip_to_update = get_trip_by_id(id)
    if(trip_to_update is None):
        return create_response(message=f"No trip with id {id} was found.", status=404)

    # Update each key
    for key in Trips.get_elements():
        if(key in info and key not in ["driver", "origin", "car"]):
            trip_to_update[key]=info[key]
        
    trip_to_update.save()

    return create_response(message=f"Successfully updated {trip_to_update.driver}'s trip with id {trip_to_update.id}.", status=201)
    

# function that is called when you visit /trips/<id>
@main.route("/trips/<id>", methods=["DELETE"])
def delete_trip(id):
    toDelete = get_trip_by_id(id)

    if (toDelete is None):
        return create_response(message=f"No trip with id {id} was found.", status=404)

    toDelete.delete()
    return(create_response(message=f"Trip with id {id} was deleted."))