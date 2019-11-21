import Homepage from './pages/Homepage.js';
import logo from './logo.svg';
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
    );
  }
}

export default App;
