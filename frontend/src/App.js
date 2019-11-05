import React from 'react';
import logo from './logo.svg';
import './App.css';
import {CardBody, CardSubtitle,Card, CardTitle, CardText,Button,Table, Row, Col, FormGroup, Label, Input, Toast, ToastBody, ToastHeader, Badge} from 'reactstrap';

class App extends React.Component {
  render() {
    return (
      <div>
        <div class = 'websitetitle'>
          <b>Carpool4UIUC</b>
          <div class = 'titlesubheader'>
            &nbsp;a Hack4Impact project
          </div>
        <hr/>
        </div>
        <HomePage/>
      </div>
    );
  }
}

class HomePage extends React.Component {
  render() {
    return (
      <div class = "filter">
          <Row>  
            <Col xs='3'>
              <FilterBar/>
            </Col>
            <Col xs='4'>
              <Trips/>
            </Col>
            <Col>
              <AdditionalDetails/>
            </Col>
          </Row>
        
      </div>
      
    );
  }
}

class FilterBar extends React.Component {
  render() {
    return (
      <div>
      <b>Filter</b><br/>
      <div className='filterpanel'>
      <FormGroup row>
        <Label for="price" sm={4}>Max Price</Label>
        <Col sm={8}>
          <Input id="price" placeholder="Enter a Price" />
        </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="destination" sm={4}>Destination</Label>
          <Col sm={8}>
            <Input id="destination" placeholder="Enter a Destination" />
          </Col>
      </FormGroup>
      <FormGroup row>
        <Label for="seats" sm={4}>Seats Left</Label>
          <Col sm={8}>
            <Input id="seats" placeholder="Enter a Seat Number" />
          </Col>
      </FormGroup>
        </div>
        </div>
    );
  }
}
class Trips extends React.Component {
  render() {
    return (
        <div>
        <b class='postsheader'>Active Trips</b>
        <div className="p-3 my-2 rounded">
          {/* <Toast>
            <ToastHeader>
              County Market
            </ToastHeader>
            <ToastBody>
              <Row>
                <Col className='cost' xs='3'>
                  <b>$5</b>
                </Col>
                <Col className='toastinfo' xs='5'>
                  <Row>
                    <b>Start: &nbsp;</b> West Quad Apt
                  </Row>
                  <Row>
                    <b>Time: &nbsp;</b> 6:30 PM 
                  </Row>
                  <Row>
                    <b>Date: &nbsp;</b> 10/31/19
                  </Row>
                </Col>
                <Col className='moreinfo'>
                <Button color="secondary" size="sm" active>More Info</Button>
                </Col>
              </Row>
            </ToastBody>
          </Toast> */}
        </div>
        </div>
    );
  }
}
class AdditionalDetails extends React.Component {
  render() {
    return (
      <div>
      <b>Additional Information</b>
      <div className= 'additionaldetails'>
        <div className="infocard">
      <Card>
        <CardBody>
          <CardTitle>
            <b  className ='drivername'>Ashank Behara</b>
            <b className = 'costinfo'> $5 </b>
          </CardTitle>
          <CardSubtitle>
            Venmo: @Ashank-Behara
          </CardSubtitle>
          <hr/>
          <div className = 'starttoend'>
            <b> West Quad Apt &#8594; CountyMarket </b>
          </div>
          <div className='datentime'>
              @ <b>6:30 PM</b> on <b>10/31/19</b>
          </div>
          <br/>
          <div>
            <b>Car Model: </b> Honda Accord <br/>
            <b>Color: </b> Blue <br />
            <b>Seats Available: </b> 3 <br />
            <b>Trunk Space: </b> Empty <br />
            <b>Speical Instructions: </b> Meet me in the back entrance behind the building. If you arrive late I will leave. <br />

          </div>
        </CardBody>
      </Card>
    </div>
      </div>
      </div>
    );
  }
}

export default App;
