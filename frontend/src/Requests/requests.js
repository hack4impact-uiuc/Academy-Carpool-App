const BASE_URL = 'http://localhost:5000';

export async function getUsers() {
  return await createRequest('GET', BASE_URL + '/users');
}

// attribs should be a key, value list of properties
export async function createUser(attribs) {
  const response = await createRequest('POST', BASE_URL + '/users', attribs);
  let id = response.result.userId;

  if ('car' in attribs) await createCar(attribs.car, id);

  return response.message;
}

export async function createCar(attribs, user_id) {
  const response = await createRequest('POST', BASE_URL + '/users/' + user_id + '/cards', attribs);

  return response.message;
}

// attribs should be a key, value list of properties
export async function updateUser(attribs, user_id) {
  const response = await createRequest('PUT', BASE_URL + '/users/' + user_id, attribs);

  return response.message;
}

export async function createTrip(attribs) {
  const car_color = attribs.car_color;
  const car_plate = attribs.car_plate;
  const car_make = attribs.car_make;
  const car_model = attribs.car_model;


  const response = await createRequest('POST', BASE_URL + '/trips', attribs);
  return response.message;
}

// Delete users
export async function deleteUser(user_id) {
  const response = await createRequest('DELETE', BASE_URL + '/users/' + user_id);

  return response.message;
}

// Get Trips
export async function getTrips() {
  const response = await createRequest('GET', BASE_URL + '/trips');
  console.log(response);

  const tripsArray = response.result.trips;
  let tripsJson = tripsArray;

  for (let i = 0; i < tripsArray.length; i++) {
    let trip = tripsArray[i];
    let timestamp = trip.posted_time.$date;
    const carId = trip.car.$oid;
    const destId = trip.destination.$oid;
    const originId = trip.origin.$oid;
    const driverId = trip.driver.$oid;

    let a = new Date(timestamp);

    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = month + ' ' + date + ' ' + year;

    trip.posted_time.$date = time;

    const allCarDetails = await createRequest('GET', BASE_URL + '/users/' + driverId + '/cars');
    let carDetails = null;

    allCarDetails.result.cars.forEach(car => {
      if (car._id.$oid == carId) carDetails = car;
    });

    const destDetails = await createRequest('GET', BASE_URL + '/locations/' + destId);
    const originDetails = await createRequest('GET', BASE_URL + '/locations/' + originId);
    const driverDetails = await createRequest('GET', BASE_URL + '/users/' + driverId);

    tripsJson[i].car = carDetails;
    tripsJson[i].destination = destDetails.result;
    tripsJson[i].origin = originDetails.result;
    tripsJson[i].driver = driverDetails.result;
  }

  console.log(tripsJson);

  return tripsJson;
}

async function createRequest(reqMethod = 'POST', url = '', data = null) {
  // Default options are marked with *

  let requestData = {
    method: reqMethod, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer' // no-referrer, *client
  };

  if (data != null) {
    requestData['body'] = JSON.stringify(data); // body data type must match "Content-Type" header
  }

  const response = await fetch(url, requestData);

  return await response.json(); // parses JSON response into native JavaScript objects
}
