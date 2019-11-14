from flask import Blueprint, request, jsonify
from api.models.Users import User
from api.models.Cars import Car
from api.models import db, Users, Person, Email, CensusResponse
from api.core import create_response, serialize_list, logger

from .populate_db import parse_census_data
from .web_scrap import extract_data_links

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
    logger.info(f"Recieved data {data}")

    user = User()

    for key in User.getAllKeys():
        if key in User.getRequiredKeys() and key not in data:
            msg = f"User not created, missing field '{key}''."
            logger.info(msg)
            return create_response(status=442, message=msg)
        if key in data:
            user[key] = data[key]

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
        if key in data and key not in User.getReferenceKeys():
            userToUpdate[key] = data[key]

    userToUpdate.save()

    return create_response(
        message=f"Successfully updated user {userToUpdate.name} with id {userToUpdate.id}.",
        status=201,
    )


##############################################
# Car Endpoints
##############################################
@main.route("/users/<id>/cars", methods=["GET"])
def get_user_cars(id):
    user = get_user_by_id(id)


    if user is None:
        return create_response(message=f"No user with id {id} was found.", status=404)

    cars = []

    for user_car in user.cars:
        cars.append(Car.objects(id=user_car.id)[0])

    #TODO: Create list of cars

    return create_response(data={"cars": cars}, status=200)


@main.route("/users/<id>/cars", methods=["POST"])
def create_user_car(id):
    data = request.get_json()
    logger.info(f"Recieved data {data}")

    user = get_user_by_id(id)

    if user is None:
        return create_response(message=f"No user with id {id} was found.", status=404)

    car = Car()

    for key in Car.getAllKeys():
        if key in Car.getRequiredKeys() and key not in data:
            msg = f"Car not created, missing field '{key}''."
            logger.info(msg)
            return create_response(status=442, message=msg)
        if key in data:
            car[key] = data[key]

    car.save()

    user.cars.append(car)

    user.save()

    return create_response(
        message=f"Successfully created car with id {car.id} for user with id {user.id}.",
        status=201,
    )


@main.route("/users/<user_id>/cars/<car_id>", methods=["PUT"])
def update_user_car(user_id, car_id):
    data = request.get_json()
    logger.info(f"Recieved data {data}")

    userToUpdate = get_user_by_id(user_id)
    if userToUpdate is None:
        return create_response(
            message=f"No user with id {user_id} was found.", status=404
        )

    carToUpdate = get_car_by_id(userToUpdate, car_id)
    if carToUpdate is None:
        return create_response(
            message=f"No car with id {car_id} belongs to user {user_id}", status=404
        )

    for key in Car.getAllKeys():
        if key in data:
            carToUpdate[key] = data[key]

    carToUpdate.save()
    return create_response(
        message=f"Successfully updated car {carToUpdate.id}.", status=201,
    )


@main.route("/users/<user_id>/cars/<car_id>", methods=["DELETE"])
def delete_user_car(user_id, car_id):
    user = get_user_by_id(user_id)
    if user is None:
        return create_response(
            message=f"No user with id {user_id} was found.", status=404
        )

    car = get_car_by_id(user, car_id)
    index = 0

    for user_car in user.cars:
        if str(user_car.id) == car_id:
            user.cars.pop(index)
        index += 1

    if car is None:
        return create_response(
            message=f"No car with id {car_id} belongs to user {user_id}", status=404
        )

    user.save()
    car.delete()
    return create_response(message=f"Car with id {car_id} was deleted.")


def get_user_by_id(user_id):
    user = User.objects(id=user_id)

    if not user:
        logger.info(f"There are no users with id {user_id}.")
        return None

    return user.get(id=user_id)

def get_car_by_id(user, car_id):
    car = Car.objects(id=car_id)

    if not car:
        logger.info(f"There are no cars with id {car_id} belonging to user {user.id}.")
        return None

    return car.get(id=car_id)
