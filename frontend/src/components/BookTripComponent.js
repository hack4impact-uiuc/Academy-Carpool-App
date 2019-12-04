import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { MDBIcon } from 'mdbreact';
import { TimePicker, DatePicker, InputNumber, Input, Select, Form, Button } from 'antd';

class BookTripComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
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
      <Card style={{ width: '40rem' }}>
      <Card.Body>
      <Row>
        <Col xs={12} md={5}>
          <Card.Title size = "small">{this.props.origin}</Card.Title>
        </Col>
        <Col xs={12} md={2}>
          <Card.Title>
            <MDBIcon icon="arrow-right" />{' '}
          </Card.Title>
        </Col>
        <Col xs={6} md={5}>
        {/* this.props.details.destination */}
          <Card.Title size = "small"> {this.props.destination} </Card.Title>
        </Col>
      </Row>
      <Form>
              <div className="top-buffer">
                <Row>
                  <Col>
                    <Form.Item>
                      {getFieldDecorator('firstName', {
                        rules: [{ required: true, message: 'Please enter first name' }]
                      })(<Input placeholder="First name" size="large" value={this.state.name} />)}
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

              <Form.Item>
                      {getFieldDecorator('email', {
                        rules: [{ required: true, message: 'Please enter email' }]
                      })(<Input placeholder="Email" size="large" />)}
              </Form.Item>

              <Row>
                  <Col>
                    <Form.Item >
                    {getFieldDecorator('phone', {
                        rules: [{ required: true, message: 'Please input your phone number!' }],
                    })(<Input size = "large" placeholder = "Phone #" addonBefore={'+1'} style={{ width: '100%' }} />)}
                    </Form.Item>

                  </Col>
                  <Col>
                    <Form.Item>
                      {getFieldDecorator('venmo', {
                        rules: [{ required: true, message: 'Please enter venmo' }]
                      })(<Input placeholder="Venmo Handle" size="large" />)}
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item>
                    {getFieldDecorator('age', {
                        rules: [{ required: true, message: 'Please enter age' }]
                    })(
                        <InputNumber placeholder = "Age" size="large" min={1} max={120} defaultValue={18}/>
                    )}
                </Form.Item>

                <Form.Item>
                {getFieldDecorator('notes', {
                  rules: [{ required: false, message: 'Optional notes not entered' }]
                })(<Input placeholder="Optional notes to driver:" size="large" />)}
                </Form.Item>

              <div style={{ paddingLeft: '75%' }}>
                <Button onClick={this.handleSubmit} variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
      </Card.Body>
    </Card>
    )
  }
}
const WrappedForm = Form.create()(BookTripComponent);
export default WrappedForm;
