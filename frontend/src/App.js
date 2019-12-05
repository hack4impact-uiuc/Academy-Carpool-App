import Homepage from './pages/Homepage.js';
import './App.css';
import React, { Component } from 'react';
// import TripComponent from './components/TripComponent';
import TripFormPage from './TripFormPage';
// import LocationSearchInput from './PlacesAutocomplete';
// import Map from './Map';
//import UserFormPage from './pages/UserFormPage'
import HomePage from './pages/Homepage';
import BookTripComponent from './components/BookTripComponent';

function App() {
  return (
    <div>
      {/* <LocationSearchInput/> */}
      {/* <Map/>  */}
      {/* <TripFormPage /> */}
      <BookTripComponent
        origin="Chambana"
        destination="Chicagooo"
        name="Navam"
        date="November 40, 2018"
        time="12:00 pm"
        visible={true}
      />
    </div>
  );
}

export default App;
