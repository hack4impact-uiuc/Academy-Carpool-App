import Homepage from './pages/Homepage.js';
<<<<<<< HEAD
import './App.css';
import React from 'react';
import {getUsers, createUser, deleteUser} from './Requests/requests.js'
import {
  CardBody,
  CardSubtitle,
  Card,
  CardTitle,
  CardText,
  Button,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
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
class App extends React.Component {

  constructor() {
    super();
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {
      email: '',
      name: '',
      age: '',
      venmo: '',
      photo: '',
      phone: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit() {
    //alert(JSON.stringify(this.state, null, '  '));
    let result = createUser(this.state)
    console.log(result);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs="12">
            <div className="websitetitle">
              <b>Carpool4UIUC</b>
              <Button className="float-right" variant="primary">Sign up</Button>
              <div className="titlesubheader">&nbsp;a Hack4Impact project</div>
            </div>
          </Col>
        </Row>

        <hr />
        
        <Homepage />

        <div>
          <h4>Create User</h4>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" placeholder="email" value={this.state.email} onChange={this.handleChange} />

          <Label for="age">Age</Label>
          <Input type="number" name="age" id="age" placeholder="20" value={this.state.age} onChange={this.handleChange}/>

          <Label for="phone">Phone</Label>
          <Input type="phone" name="phone" id="phone" placeholder="0000000000" value={this.state.phone} onChange={this.handleChange}/>

          <Label for="name">Name</Label>
          <Input type="text" name="name" id="name" placeholder="Name" value={this.state.name} onChange={this.handleChange}/>

          <Label for="venmo">Venmo</Label>
          <Input type="text" name="venmo" id="venmo" placeholder="@venmo_handle" value={this.state.venmo} onChange={this.handleChange}/>

          <Label for="photo">Photo</Label>
          <Input type="text" name="photo" id="photo" placeholder="https://photo"  value={this.state.photo} onChange={this.handleChange}/>

          <Button onClick={this.onFormSubmit}>Submit</Button>
        </div>
      </div>
=======
import SignUp from './pages/SignUp.js';
import TripFormPage from './pages/TripFormPage.js';

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
>>>>>>> 91d03944fe64d7c56b15cf87f5a038684e70343d
    );
  }
}

export default App;
