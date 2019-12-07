import React, { Component } from 'react';
import { Button, Col, Jumbotron, Row } from 'react-bootstrap';
import './TripFormPage.css';
import { TimePicker, DatePicker, InputNumber, Input, Select, Form } from 'antd';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';
const { Option } = Select;

class TripFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ' '
    };
  }
  // handleLocationChange = address => {
  //   this.setState({ searchValue: address });
  // };
  
  // Figure out how to return lat and lng like a stacked json
  // also it shows Object object randomly which is not right
  func(param) {
    geocodeByAddress(param)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          this.setState({searchValue : {address: param, lat: latLng.lat, lng: latLng.lng, }})}, 
          // console.log('Success', latLng),
          )
        .catch(error => {this.setState({searchValue : param})});
        console.log("geocode running")
        return this.state.searchValue
    };

  handleLocationSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => 
        console.log('Success', latLng),
        )
      .catch(error => console.error('Error', error));
  };

  // handleLocation = address => {
  //   return "bitch assssss" + address
  // }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({ value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div></div>
        <div>
          <Jumbotron style={{ width: '50rem' }}>
            <h1>New Trip</h1>
            <Form>
              <div className="top-buffer">
                <Row>
                  <Col>
                    <Form.Item>
                      {getFieldDecorator('firstName', {
                        getValueFromEvent: e => this.func(e.target.value),
                        rules: [{ required: true, message: 'Please enter first name' }]
                      })(<Input placeholder="First name" size="large" />)}
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      {getFieldDecorator('lastName', {
                        rules: [{ required: true, message: 'Please enter last name' }]
                      })(<Input placeholder="Last name" size="large" />)}
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <div>
                <Row>
                  <Col md={4}>
                    <Form.Item>
                      {getFieldDecorator('date', {
                        rules: [{ required: true, message: 'Please choose a date' }]
                      })(<DatePicker style={{ width: '10rem' }} size="large" />)}
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      {getFieldDecorator('time', {
                        rules: [{ required: true, message: 'Please choose a time' }]
                      })(<TimePicker style={{ width: '10rem' }} size="large" use12Hours format="h:mm a" />)}
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <div>
                <Row>
                  <Col>
                    <Form.Item>
                      {getFieldDecorator('origin', {
                        //initialValue: "1690 Carthage Court, Naperville, IL, USA",
                        getValueFromEvent: e => this.func(e),
                        rules: [{ required: true, message: 'Please choose origin' }]
                      })(
                        <PlacesAutocomplete value = {"dis bitch defined"} onChange={this.handleLocationChange} onSelect={this.handleLocationSelect}>
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                              <Input
                                size="large"
                                {...getInputProps({
                                  placeholder: 'Origin',
                                  className: 'location-search-input',
                                  color: '17D82F',
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                                </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      
                      )}
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      {getFieldDecorator('destination', {
                        rules: [{ required: true, message: 'Please choose destination' }]
                      })(
                        <PlacesAutocomplete onChange={this.handleLocationChange} onSelect={this.handleLocationSelect}>
                          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <div>
                              <Input
                                size="large"
                                {...getInputProps({
                                  placeholder: 'Destination',
                                  className: 'location-search-input',
                                  color: '17D82F'
                                })}
                              />
                              <div className="autocomplete-dropdown-container">
                                {loading && <div>Loading...</div>}
                                {suggestions.map(suggestion => {
                                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style
                                      })}
                                    >
                                      <span>{suggestion.description}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </PlacesAutocomplete>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <Row>
                <Col>
                  <div className="top-buffer">
                    <Form.Item style={{ width: '10rem' }}>
                      {getFieldDecorator('trunk', {
                        rules: [{ required: true, message: 'Please select available trunk size!' }]
                      })(
                        <Select placeholder="Trunk Size" onChange={this.handleSelectChange} size="large">
                          <Option value="Small">Small</Option>
                          <Option value="Medium">Medium</Option>
                          <Option value="Large">Large</Option>
                          <Option value="Extra Large">Extra Large</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </div>
                </Col>

                <Col>
                  <div class="top-buffer">
                    <Form.Item style={{ width: '10rem' }}>
                      {getFieldDecorator('seats', {
                        rules: [{ required: true, message: 'Please select the number of seats available!' }]
                      })(
                        <Select placeholder="Select Seats" onChange={this.handleSelectChange} size="large">
                          <Option value="1">1</Option>
                          <Option value="2">2</Option>
                          <Option value="3">3</Option>
                          <Option value="4">4</Option>
                          <Option value="5">5</Option>
                          <Option value="6">6</Option>
                          <Option value="7">7</Option>
                          <Option value=">7">Other - Specify in Notes</Option>
                        </Select>
                      )}
                    </Form.Item>
                  </div>
                </Col>
                <Col>
                  <div class="top-buffer">
                    <Form.Item>
                      {getFieldDecorator('cost', {
                        rules: [{ required: true, message: 'Please enter price' }]
                      })(
                        <InputNumber
                          size="large"
                          defaultValue={5}
                          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                          parser={value => value.replace(/\$\s?|(,*)/g, '')}
                        />
                      )}
                    </Form.Item>
                  </div>
                </Col>
              </Row>

              <div class="top-buffer">
                <Form.Item>
                  {getFieldDecorator('color', {
                    rules: [{ required: true, message: 'Please enter vehicle color' }]
                  })(<Input placeholder="Vehicle Color" size="large" />)}
                </Form.Item>
              </div>
              <Form.Item>
                {getFieldDecorator('license', {
                  rules: [{ required: true, message: 'Please enter license number' }]
                })(<Input placeholder="License Plate" size="large" />)}
              </Form.Item>
              <div>
                <Row>
                  <Col>
                    <Form.Item>
                      {getFieldDecorator('model', {
                        rules: [{ required: true, message: 'Please enter vehicle model' }]
                      })(<Input placeholder="Vehicle Model" size="large" />)}
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      {getFieldDecorator('make', {
                        rules: [{ required: true, message: 'Please enter vehicle make' }]
                      })(<Input placeholder="Vehicle Make" size="large" />)}
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <Form.Item>
                {getFieldDecorator('notes', {
                  rules: [{ required: false, message: 'Optional notes not entered' }]
                })(<Input placeholder="Add Trip Notes:" size="large" />)}
              </Form.Item>

              <div class="submittop-buffer" style={{ paddingLeft: '75%' }}>
                <Button onClick={this.handleSubmit} variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Jumbotron>
        </div>
      </div>
    );
  }
}
const WrappedForm = Form.create()(TripFormPage);
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDvWoyydgE3bfQCi_t65khOUnMgvkuqgPI'
})(WrappedForm);
