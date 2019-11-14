import React, { Component } from 'react';
import { Form, Button, Col, Jumbotron, Row, InputGroup, FormControl } from 'react-bootstrap';
import { MDBIcon } from 'mdbreact';
import './TripFormPage.css';
import { TimePicker, DatePicker, InputNumber, Input } from 'antd';
import LocationSearchInput from './PlacesAutocomplete';
class TripFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleSubmit = () => {
    //connect to backend
  };

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Jumbotron style={{ width: '50rem' }}>
          <h1>New Trip</h1>
          <Form>
            <div class="top-buffer">
              <Row>
                <Col>
                  <Input placeholder="First name" size="large" />
                </Col>
                <Col>
                  <Input placeholder="Last name" size="large" />
                </Col>
              </Row>
            </div>

            <div class="top-buffer">
              <Row>
                <Col md={4}>
                  <DatePicker style={{ width: '10rem' }} size="large" />
                </Col>
                <Col>
                  <TimePicker style={{ width: '10rem' }} size="large" use12Hours format="h:mm a" />
                </Col>
              </Row>
            </div>

            <div class="top-buffer">
              <Row>
                <Col>
                  <Form.Label>Origin</Form.Label>
                  <LocationSearchInput id="orgin" />
                </Col>
                <Col>
                  <Form.Label>Destination</Form.Label>
                  <LocationSearchInput id="destination" />
                </Col>
              </Row>
            </div>

            <Row>
              <Col>
                <div class="top-buffer">
                  <Form.Group controlId="formGridState" style={{ width: '10rem' }}>
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
                <div class="top-buffer">
                  <Form.Group controlId="formGridState" style={{ width: '10rem' }}>
                    <Form.Label>Seats Available</Form.Label>
                    <Form.Control as="select">
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
                <div class="moneytop-buffer">
                  <InputNumber
                    size="large"
                    defaultValue={5}
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  />
                </div>
              </Col>
            </Row>

            <div class="top-buffer">
              <Form.Group>
                <Form.Label>Vehicle Information:</Form.Label>
                <Input placeholder="Vehicle Color" size="large" />
              </Form.Group>
            </div>
            <Form.Group>
              <Input placeholder="Vehicle License Plate" size="large" />
            </Form.Group>

            <div>
              <Row>
                <Col>
                  <Input placeholder="Vehicle Model" size="large" />
                </Col>
                <Col>
                  <Input placeholder="Vehicle Make" size="large" />
                </Col>
              </Row>
            </div>
            <div class="submittop-buffer" style={{ paddingLeft: '75%' }}>
              <Button onClick={this.handleSubmit} variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Jumbotron>
      </div>
    );
  }
}

export default TripFormPage;
