import React from 'react';
import logo from './logo.svg';
import './App.css';
import TripComponent from './TripComponent';
import TripFormPage from './TripFormPage';
import LocationSearchInput from './PlacesAutocomplete';
import Map from './Map';
import TestForm from './TestForm';

function App() {
  return (
    <div>
      {/* <LocationSearchInput/> */}
      {/* <Map/>  */}
      <TripFormPage />
    </div>
  );
}

export default App;
