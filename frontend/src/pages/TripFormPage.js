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
      searchValue: '',
      firstname: '',
      lastname: '',
      date: '',
      time: '',
      origin: '',
      destination: '',
      trunk_size: '',
      num_seats: 0,
      cost: 0,
      car_color: '',
      car_plate: '',
      car_make: '',
      car_model: ''
    };

    this.handleChange = this.handleChange.bind(this);
    //this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleOriginChange = address => {
    this.setState({ origin: address });
  };
  
  handleDestChange = address => {
    this.setState({ destination: address });
  };
  
  handleCostChange = cost => {
    this.setState({ cost: cost });
  };

  updateDate = date => {
    this.setState({ date: date});
  };

  updateTime = time => {
    this.setState({ time: time});
  };

  handleOriginLocationSelect = address => {
    this.setState({origin: address});

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  handleDestLocationSelect = address => {
    this.setState({destination: address});

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }

      alert(JSON.stringify(this.state, null, '  '));
    });


  };

  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({ value });
    //this.setState({[name]: tar});
  };

  handleTrunkChange = value => {
    this.props.form.setFieldsValue({ value });
    this.setState({trunk_size: value});
  };

  handleSeatsChange = value => {
    this.props.form.setFieldsValue({ value });
    this.setState({num_seats: value});
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;
    return (
      <div style={{ background: '#ededed', overflowY: 'visible' }}>
        <div style={{ float: 'center', display: 'flex', justifyContent: 'center', paddingTop: '3%' }}>
          <div>
            <Jumbotron style={{ width: '50rem' }}>
              <h1>New Trip</h1>
              <Form>
                <div className="top-buffer">
                  <Row>
                    <Col>
                      <Form.Item>
                        {getFieldDecorator('firstName', {
                          rules: [{ required: true, message: 'Please enter first name' }]
                        })(<Input placeholder="First name" size="large" name="firstname" value={this.state.name} onChange={this.handleChange}/>)}
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item>
                        {getFieldDecorator('lastName', {
                          rules: [{ required: true, message: 'Please enter last name' }]
                        })(<Input placeholder="Last name" name="lastname" size="large" onChange={this.handleChange}/>)}
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
                        })(<DatePicker style={{ width: '10rem' }} size="large" onChange={this.updateDate}/>)}
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item>
                        {getFieldDecorator('time', {
                          rules: [{ required: true, message: 'Please choose a time' }]
                        })(<TimePicker style={{ width: '10rem' }} size="large" use12Hours format="h:mm a" onChange={this.updateTime}/>)}
                      </Form.Item>
                    </Col>
                  </Row>
                </div>

                <div>
                  <Row>
                    <Col>
                      <Form.Item name="origin" onChange={this.handleChange}>
                        {getFieldDecorator('origin', {
                          rules: [{ required: true, message: 'Please choose origin' }]
                        })(
                          <PlacesAutocomplete onChange={this.handleOriginChange} >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                              <div>
                                <Input
                                  size="large"
                                  {...getInputProps({
                                    placeholder: 'Origin',
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
                    <Col>
                      <Form.Item>
                        {getFieldDecorator('destination', {
                          rules: [{ required: true, message: 'Please choose destination' }]
                        })(
                          <PlacesAutocomplete onChange={this.handleDestChange}>
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                              <div>
                                <Input
                                  size="large"
                                  name="destination"
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
                    <div class="top-buffer">
                      <Form.Item style={{ width: '10rem' }}>
                        {getFieldDecorator('trunk', {
                          rules: [{ required: true, message: 'Please select available trunk size!' }]
                        })(
                          <Select placeholder="Trunk Size" onChange={this.handleTrunkChange} size="large" name="trunk_size">
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
                          <Select placeholder="Select Seats" onChange={this.handleSeatsChange} size="large" name="num_seats">
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
                            name="cost"
                            onChange={this.handleCostChange}
                            size="large"
                            min={0}
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
                    })(<Input placeholder="Vehicle Color" size="large" name="car_color" onChange={this.handleChange}/>)}
                  </Form.Item>
                </div>
                <Form.Item>
                  {getFieldDecorator('license', {
                    rules: [{ required: true, message: 'Please enter license number' }]
                  })(<Input placeholder="License Plate" size="large" name="car_plate" onChange={this.handleChange}/>)}
                </Form.Item>
                <div>
                  <Row>
                    <Col>
                      <Form.Item>
                        {getFieldDecorator('model', {
                          rules: [{ required: true, message: 'Please enter vehicle model' }]
                        })(<Input placeholder="Vehicle Model" size="large" name="car_model" onChange={this.handleChange}/>)}
                      </Form.Item>
                    </Col>
                    <Col>
                      <Form.Item>
                        {getFieldDecorator('make', {
                          rules: [{ required: true, message: 'Please enter vehicle make' }]
                        })(<Input placeholder="Vehicle Make" size="large" name="car_make" onChange={this.handleChange}/>)}
                      </Form.Item>
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
        </div>
      </div>
    );
  }
}
const WrappedForm = Form.create()(TripFormPage);
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDvWoyydgE3bfQCi_t65khOUnMgvkuqgPI'
})(WrappedForm);
