import React, { Component } from 'react';
import { Form, Button, Col, Jumbotron, Row, InputGroup, FormControl} from 'react-bootstrap';
import { MDBIcon } from 'mdbreact';
import './TripFormPage.css';
import { SingleDatePicker} from 'react-dates';
import { TimePicker, DatePicker } from 'antd';
import LocationSearchInput from './PlacesAutocomplete'
/**
 * using ant design
 * https://developers.google.com/maps/documentation/javascript/places-autocomplete
 * Things Needed:
 * Add Trip title
 * Name (First and Last) - then concatonate
 * Date and Time chooser
 * Location: uber wrapper (start and end)
 * Cost number form (money form?)
 * Vehicle info: color, make, model, license (all as strings)
 * Seats: int
 * Trunk: options: small, medium, large, extra large
 * Notes: A String
 * 
 * do this: date picker and location picker
 * set these to variables
 * if have time: make form slide up, change cost input
 * 
 * wednesday: make the location show up when clicking with mouse
 * what data for the locations should be collected??
 * connect the data.
 */
class TripFormPage extends React.Component {
    constructor(props) {
        super(props)
        this.state ={ 
            
        }
    }
    handleSubmit = () => {
        let request = new FormData()
         console.log(this.state);
        request.append("firstname" + "lastname", this.state.name)
        request.append("date", this.state.date)
        request.append("time", this.state.time)
        request.append("orgin", this.state.orgin)
        request.append("destination", this.state.destination)
        request.append("trunk", this.state.trunk)
        request.append("seats", this.state.seats)
        request.append("orgin", this.state.orgin)
        request.append("orgin", this.state.orgin)
        request.append("orgin", this.state.orgin)
        request.append("orgin", this.state.orgin)
        /*
        fetch("http://127.0.0.1:5000/posts", 
          {
            body: request,
            method: "post"
          }
        )
        */
    
      }




    render() {
        return (
        
            <div style={{display: 'flex', justifyContent: 'center'}}>
            <Jumbotron style={{width: "50rem"}}>
            <h1>New Trip</h1>
            <Form>
                <div class = "top-buffer">
                <Row >
                    <Col>
                    <Form.Control placeholder="First name" id="firstname"/>
                    </Col>
                    <Col>
                    <Form.Control placeholder="Last name" id = "lastname"/>
                    </Col>
                </Row>
                </div>

                <div class = "top-buffer">
                <Row>
                <Col md={4}>
                <DatePicker style={{width: "10rem"}} size="large" id="date"/>
                </Col>
                <Col>
                <TimePicker style={{width: "10rem"}} size="large" use12Hours format="h:mm a" id="time" />
                </Col>
                </Row>
                </div>

                <div class = "top-buffer">
                <Row>
                <Col>
                <Form.Label>Origin</Form.Label>
                <LocationSearchInput id="orgin"/>
                </Col>
                <Col>
                <Form.Label>Destination</Form.Label>
                <LocationSearchInput id="destination"/>
                </Col>
                </Row>
                </div>

                <Row>
                <Col>
                <div class = "top-buffer">
                 <Form.Group controlId="formGridState" style={{width: "10rem"}} id="trunk">
                <Form.Label>Trunk Size</Form.Label>
                <Form.Control as="select">
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                    <option>Extra Large</option>
                </Form.Control>
                </Form.Group>
                </div>
                </Col>
                <Col>
                <div class = "top-buffer">
                 <Form.Group controlId="formGridState" style={{width: "10rem"}} id="seats">
                <Form.Label>Seats Available</Form.Label>
                <Form.Control as="select" >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>Other - Specify in Notes </option>
                </Form.Control>
                </Form.Group>
                </div>
                </Col>
                <Col>
                <div class = "moneytop-buffer">
                <InputGroup className="mb-3" style={{width: "10rem"}}>
                    <InputGroup.Prepend>
                    <InputGroup.Text>$</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl aria-label="Amount (to the nearest dollar)" />
                    <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                    </InputGroup.Append>
                </InputGroup>
                </div>
                </Col>
                </Row>


                <div class = "top-buffer">
                <Form.Group>
                    <Form.Label>Vehicle Information:</Form.Label>
                    <Form.Control  placeholder="Vehicle Color" />
                </Form.Group>
                </div>
                <Form.Group >
                    {/* <Form.Label>License Plate</Form.Label> */}
                    <Form.Control  placeholder="Vehicle License Plate" />
                </Form.Group>
                

                <div>
                <Row >
                    <Col>
                    <Form.Control placeholder="Vehicle Model" id="vehicleModel"/>
                    </Col>
                    <Col>
                    <Form.Control placeholder="Vehicle Make" id = "vehicleMake"/>
                    </Col>
                </Row>
                </div>
                
                <Button  variant="primary" type="submit">
                    Submit
                </Button> 

                </Form>
            </Jumbotron>
            

            </div>
        );
    }
}

export default TripFormPage;
