from flask import Blueprint, request, jsonify
from api.models.Trips import Trip
from api.models.Users import User
#from api.models.Cars import Car
from api.models import db, Users, Person, Email, CensusResponse
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


##################################
# EXAMPLES
##################################

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
    trips = Trip.objects()
    return create_response(data={"trips": trips}, status=200)

# function that is called when you visit /trips
@main.route("/trips", methods=["POST"])
def create_trip():
    info = request.get_json()
    logger.info("Recieved info {}", info)

    trip = Trip()

    for key in Trips.get_elements():
        if key in Trips.get_required_elements() and key not in info:
            msg = f"{key} is required and is not in info."
            logger.info(f"Trip was not created, missing field '{key}'.")
            return create_response(status=442, message=msg)
        elif key in Trips.get_required_elements() and key in info:
            trip[key] = info[key]

    trip.save()

    return create_response(
        message=f"Successfully created trip with driver {trip.driver} and id {trip.id}.", status=201
    )

# function that identifies the trip based on its id
def get_trip_by_id(trip_id):
    trip = Trip.objects(id=trip_id)
    
    if not trip:
        logger.info(f"There are no trips with id {trip_id}.")
        return None

    return trip.get(id=trip_id)

# function that is called when you visit /trips/<id>
@main.route("/trips/<id>", methods=["PUT"])
def update_trip(id):
    info = request.get_json()
    logger.info(f"Recieved info {info}.")

    trip_to_update = get_trip_by_id(id)
    if trip_to_update is None:
        return create_response(message=f"No trip with id {id} was found.", status=404)

    # Update each key, but not users, location, or cars
    for key in Trip.get_elements():
        if key in info and key not in ["past_drivers", "past_passengers", "current_users"]:
            trip_to_update[key]=info[key]
        
    trip_to_update.save()

    return create_response(
        message=f"Successfully updated trip with driver {trip_to_update.driver} and id {trip_to_update.id}.", status=201
    )

# function that is called when you visit /trips/<id>
@main.route("/trips/<id>", methods=["DELETE"])
def delete_trip(id):
    to_delete = get_trip_by_id(id)

    if to_delete is None:
        return create_response(message=f"No trip with id {id} was found.", status=404)

    to_delete.delete()
    return create_response(
        message=f"Trip with driver {to_delete.driver} and id {id} has been deleted."
    )

# function that is called when you visit /trips/<id>/users
@main.route("/trips/<id>/users", methods=["GET"])
def get_users_in_trip(id):
    trip = get_trip_by_id(id)

    if trip is None:
        return create_response(
            message=f"No trip with id {id} was found.", status=404
        )
    
    driver = User.objects(id=trip.driver.id)
    passengers = []

    logger.info(f"Driver: {len(trip.driver)}")
    logger.info(f"Passengers: {len(trip.passengers)}")

    logger.info(f"Driver: {User.objects(id=driver_in_trip.id)}")

    for passengers_in_trip in trip.passengers:
        logger.info(f"Passengers: {User.objects(id=passengers_in_trip.id)}")
        passengers.append(User.objects(id=passengers_in_trip.id))

    return create_response(
        data={"driver": driver, "passengers": passengers}, status=200
    )

# function that is called when you visit /trips/<id>/users
# NOTE: can only add passengers, but CANNOT add drivers to a trip
@main.route("/trips/<id>/users", methods=["POST"])
def create_users_for_trip(id):
    info = request.get_json()
    logger.info(f"Recieved info {info}")

    trip = get_trip_by_id(id)

    if trip is None:
        return create_response(
            message=f"No trip with id {id} was found.", status=404
        )

    user = User() # passenger

    for key in Users.getAllKeys():
        if key in Users.getRequiredKeys() and key not in info:
            msg = f"User was not created because missing required User field '{key}'."
            logger.info(msg)
            return create_response(
                message=msg, status=442
            )
        elif key in Users.getRequiredKeys() and key in info:
            user[key] = info[key]
    
    user.save()

    trip.passengers.append(user)
    trip.save()

    return create_response(
        message=f"Successfully created user (passenger) with id {user.id} for trip with driver {trip.driver} and id {trip.id}.", status=201
    )

# function that is called when you visit /trips/<trip_id>/users/<user_id>
@main.route("/trips/<trip_id>/users/<user_id>", methods=["PUT"])
def update_users_in_trip(trip_id, user_id):
    info = request.get_json()
    logger.info(f"Recieved info {info}")

    trip_to_update = get_trip_by_id(trip_id)

    if trip_to_update is None:
        return create_response(
            message=f"No trip with id {trip_id} was found.", status=404
        )
    
    user_to_update = None
    index = 0

    for user_in_trip in trip_to_update.passengers:
        if str(user_in_trip.id) == str(user_id):
            user_to_update = user_in_trip
            for key in Users.getAllKeys():
                if key in info:
                    user_to_update[key] = info[key]
            trip_to_update.save()
            return create_response(
                message=f"Successfully updated user {user_to_update.id} in trip with driver {trip_to_update.driver} and id {trip_to_update.id}.", status=201
            )
        else:
            index += 1

    # executed in the case that user_to_update is None
    return create_response(
        message=f"No user with id {user_id} is included in trip with driver {trip_to_update.driver} and id {trip_id}", status=404
    )

# function that is called when you visit /trips/<trip_id>/users/<user_id>
@main.route("/trips/<trip_id>/users/<user_id>", methods=["DELETE"])
def delete_users_in_trip(trip_id, user_id):
    trip = get_trip_by_id(trip_id)

    if trip is None:
        return create_response(
            message=f"No trip with id {trip_id} was found.", status=404
        )

    index = 0

    for user_in_trip in trip.passengers:
        if str(user_in_trip.id) == str(user_id):
            trip.passengers.pop(index) # only delete the user from the trip (not from the database)
            trip.save()
            return create_response(
                message=f"User with id {user_id} was deleted from trip with driver {trip.driver} and id {trip_id}."
            )
        else:
            index += 1

    return create_response(
        message=f"No user with id {user_id} is included in trip with driver {trip.driver} and id {trip_id}", status=404
    )

# function that is called when you visit /trips/<id>/locations
@main.route("/trips/<id>/locations", methods=["GET"])
def get_locations_in_trip(id):
    trip = get_trip_by_id(id)

    if trip is None:
        return create_response(
            message=f"No trip with id {id} was found.", status=404
        )
    
    locations = []

    logger.info(f"Locations: {len(trip.checkpoints)}")

    for locations_in_trip in trip.checkpoints:
        logger.info(f"Locations: {Location.objects(id=locations_in_trip.id)}")
        passengers.append(Location.objects(id=locations_in_trip.id))

    return create_response(
        data={"locations": locations}, status=200
    )

# function that is called when you visit /trips/<id>/locations
@main.route("/trips/<id>/locations", methods=["POST"])
def create_locations_in_trip(id):
    info = request.get_json()
    logger.info(f"Recieved info {info}")

    trip = get_trip_by_id(id)

    if trip is None:
        return create_response(
            message=f"No trip with id {id} was found.", status=404
        )

    location = Location()

    for key in Location.get_elements():
        if key in Location.get_elements() and key not in info:
            msg = f"Location was not created because missing required Location field '{key}'."
            logger.info(msg)
            return create_response(
                message=msg, status=442
            )
        elif key in Location.get_elements() and key in info:
            location[key] = info[key]
    
    location.save()

    trip.checkpoints.append(location)
    trip.save()

    return create_response(
        message=f"Successfully created location with id {location.id} for trip with driver {trip.driver} and id {trip.id}.", status=201
    )

# function that is called when you visit /trips/<trip_id>/locations/<location_id>
@main.route("/trips/<trip_id>/locations/<location_id>", methods=["PUT"])
def update_locations_in_trip(trip_id, location_id):
    info = request.get_json()
    logger.info(f"Recieved info {info}")

    trip_to_update = get_trip_by_id(trip_id)

    if trip_to_update is None:
        return create_response(
            message=f"No trip with id {trip_id} was found.", status=404
        )
    
    location_to_update = None

    if str(trip_to_update.origin.id) == str(location_id):
        location_to_update = trip_to_update.origin
        for key in Location.get_elements():
            location_to_update[key] = info[key]
    elif str(trip_to_update.destination.id) == str(location_id):
        location_to_update = trip_to_update.destination
        for key in Location.get_elements():
            location_to_update[key] = info[key]
    else:
        for location_in_trip in trip_to_update.checkpoints:
            if str(location_in_trip.id) == str(location_id):
                location_to_update = location_in_trip
                for key in Location.get_elements():
                    location_to_update[key] = info[key]

    if location_to_update is None:
        return create_response(
            message=f"No location with id {location_id} is included in trip with driver {trip_to_update.driver} and id {trip_id}", status=404
        )

    trip_to_update.save()
    return create_response(
        message=f"Successfully updated location {location_to_update.id} in trip with driver {trip_to_update.driver} and id {trip_to_update.id}.", status=201
    )

# function that is called when you visit /trips/<trip_id>/locations/<location_id>
@main.route("/trips/<trip_id>/locations/<location_id>", methods=["DELETE"])
def delete_locations_in_trip(trip_id, location_id):
    trip = get_trip_by_id(trip_id)

    if trip is None:
        return create_response(
            message=f"No trip with id {trip_id} was found.", status=404
        )
    
    if str(trip.origin.id) == str(location_id):
        return create_response(
            message=f"Cannot delete the starting location of the trip. Change the starting point instead.", status=404
        )
    elif str(trip.destination.id) == str(location_id):
        return create_response(
            message=f"Cannot delete the final destination of the trip. Change the final destination instead.", status=404
        )

    index = 0
    for location_in_trip in trip.checkpoints:
        if str(location_in_trip.id) == str(location_id):
            trip.checkpoints.pop(index)
            trip.save()
            return create_response(
                message=f"Location with id {location_id} was deleted from trip with driver {trip.driver} and id {trip_id}."
            )
        else:
            index += 1

    return create_response(
        message=f"No location with id {location_id} is included in trip with driver {trip.driver} and id {trip_id}", status=404
    )



###################################
# CARPOOL IMPLEMENTATIONS
##################################


@main.route("/users", methods=["GET"])
def get_users():
    users = User.objects()
    return create_response(data={"users": users}, status=200)


@main.route("/users", methods=["POST"])
def create_user():
    data = request.get_json()
    logger.info("Recieved data {}", data)

    # Make sure that all required fields are filled
    for key in User.getRequiredKeys():
        if key not in data:
            msg = f"{key} not in data"
            logger.info(f"User not created, missing field '{key}''.")
            return create_response(status=442, message=msg)

    age = data["age"]
    email = data["email"]
    name = data["name"]
    phone = data["phone"]

    user = User(age=age, email=email, name=name, phone=phone)
    user.save()

    return create_response(
        message=f"Successfully created user {user.name} with id {user.id}.", status=201
    )


@main.route("/users/<id>", methods=["DELETE"])
def delete_user(id):
    toDelete = get_user_by_id(id)
    if toDelete is None:
        return create_response(message=f"No user with id {id} was found.", status=404)

    toDelete.delete()
    return create_response(message=f"User with id {id} was deleted.")


@main.route("/users/<id>", methods=["PUT"])
def update_user(id):
    data = request.get_json()
    logger.info(f"Recieved data {data}")

    userToUpdate = get_user_by_id(id)
    if userToUpdate is None:
        return create_response(message=f"No user with id {id} was found.", status=404)

    # Update each key but don't update allow to update cars or trips here
    for key in User.getAllKeys():
        if key in data and key not in [
            "past_driver_trips",
            "past_passanger_trips",
            "current_trips",
        ]:
            userToUpdate[key] = data[key]

    userToUpdate.save()

    return create_response(
        message=f"Successfully updated user {userToUpdate.name} with id {userToUpdate.id}.",
        status=201,
    )


def get_user_by_id(user_id):
    user = User.objects(id=user_id)

    if not user:
        logger.info(f"There are no users with id {user_id}.")
        return None

    return user.get(id=user_id)
