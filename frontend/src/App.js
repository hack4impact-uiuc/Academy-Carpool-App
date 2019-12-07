import Homepage from './pages/Homepage.js';
<<<<<<< HEAD
import './App.css';
//import TripComponent from './TripComponent';
import TripFormPage from './TripFormPage';
import React, { Component } from 'react';
//import LocationSearchInput from './PlacesAutocomplete';
//import Map from './Map';

function App() {
  return (
    <div>
      {/* <LocationSearchInput/> */}
      {/* <Map/>  */}
      <TripFormPage />
    </div>
  );
=======
import SignUp from './pages/SignUp.js';
import TripFormPage from './pages/TripFormPage.js';
>>>>>>> 91d03944fe64d7c56b15cf87f5a038684e70343d

import logo from './logo.svg';
import './App.css';
import React from 'react';
import {
  CardBody,
  CardSubtitle,
  Card,
  CardTitle,
  CardText,
  Button,
  Table,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Toast,
  ToastBody,
  ToastHeader,
  Badge
} from 'reactstrap';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class App extends React.Component {
  render() {
    return (
      <Router>
        <div style={{ backgroundColor: 'white' }}>
          <div className="websitetitle">
            <b>Carpool4UIUC</b>
            <Link to="/login" style={{ color: 'white' }}>
              <Button color="primary" style={{ float: 'right', marginRight: '1%' }}>
                Login
              </Button>
            </Link>
            <Link to="/trips" style={{ color: 'white' }}>
              <Button color="primary" style={{ float: 'right', marginRight: '0.5%' }}>
                Trips
              </Button>
            </Link>
            <Link to="/addtrip" style={{ color: 'white' }}>
              <Button color="primary" style={{ float: 'right', marginRight: '0.5%' }}>
                Add Trip
              </Button>
            </Link>
          </div>
          <Switch>
            <Route exact path="/trips" component={Homepage} />
            <Route path="/login" component={SignUp} />
            <Route path="/addtrip" component={TripFormPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
