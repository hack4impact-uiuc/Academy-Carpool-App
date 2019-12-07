import React, { Component } from 'react';
import { Button, Col, Jumbotron, Row } from 'react-bootstrap';
import { TimePicker, DatePicker, InputNumber, Input, Select, Form } from 'antd';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { GoogleApiWrapper } from 'google-maps-react';
import { createUser } from '../Requests/requests.js';
const { Option } = Select;

class UserFormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      age: '',
      phone: '',
      venmo_handle: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let userAttributes = this.state;
        userAttributes.name = userAttributes.firstname + ' ' + userAttributes.lastname;
        createUser(userAttributes);
      }
    });
  };

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleAgeChange = age => {
    this.setState({ age: age });
  };

  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({ value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { errorMessages, validators, requiredError, validatorListener, ...rest } = this.props;
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div></div>
        <div>
          <Jumbotron style={{ width: '50rem' }}>
            <h1>New User</h1>
            <Form>
              <div className="top-buffer">
                <Row>
                  <Col>
                    <Form.Item>
                      {getFieldDecorator('firstName', {
                        rules: [{ required: true, message: 'Please enter first name' }]
                      })(
                        <Input
                          placeholder="First name"
                          name="firstname"
                          size="large"
                          value={this.state.firstname}
                          onChange={this.handleChange}
                        />
                      )}
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item>
                      {getFieldDecorator('lastName', {
                        rules: [{ required: true, message: 'Please enter last name' }]
                      })(
                        <Input
                          placeholder="Last name"
                          name="lastname"
                          size="large"
                          value={this.state.lastname}
                          onChange={this.handleChange}
                        />
                      )}
                    </Form.Item>
                  </Col>
                </Row>
              </div>

              <Form.Item>
                {getFieldDecorator('email', {
                  rules: [{ required: true, message: 'Please enter email' }]
                })(<Input placeholder="Email" name="email" size="large" onChange={this.handleChange} />)}
              </Form.Item>

              <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!'
                    },
                    {
                      validator: this.validateToNextPassword
                    }
                  ]
                })(<Input.Password size="large" placeholder="Please enter password" />)}
              </Form.Item>
              <Form.Item hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    },
                    {
                      validator: this.compareToFirstPassword
                    }
                  ]
                })(
                  <Input.Password size="large" placeholder="Please confirm password" onBlur={this.handleConfirmBlur} />
                )}
              </Form.Item>

              <Row>
                <Col>
                  <Form.Item>
                    {getFieldDecorator('phone', {
                      rules: [{ required: true, message: 'Please input your phone number!' }]
                    })(
                      <Input
                        size="large"
                        placeholder="Phone #"
                        name="phone"
                        addonBefore={'+1'}
                        onChange={this.handleChange}
                        style={{ width: '100%' }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item>
                    {getFieldDecorator('venmo', {
                      rules: [{ required: true, message: 'Please enter venmo' }]
                    })(
                      <Input placeholder="Venmo Handle" size="large" name="venmo_handle" onChange={this.handleChange} />
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item>
                {getFieldDecorator('age', {
                  rules: [{ required: true, message: 'Please enter age' }]
                })(
                  <InputNumber
                    placeholder="Age"
                    size="large"
                    min={1}
                    max={120}
                    onChange={this.handleAgeChange}
                    defaultValue={18}
                  />
                )}
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
const WrappedForm = Form.create()(UserFormPage);
export default WrappedForm;
