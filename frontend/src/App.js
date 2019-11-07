import Homepage from './pages/Homepage.js';
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

class App extends React.Component {
  render() {
    return (
      <div>
        <div class="websitetitle">
          <b>Carpool4UIUC</b>
          <div class="titlesubheader">&nbsp;a Hack4Impact project</div>
          <hr />
        </div>
        <Homepage />
      </div>
    );
  }
}

export default App;
