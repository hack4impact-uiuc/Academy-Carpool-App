import React, { Component } from 'react';
import { Card, Button, Row, Col, OverlayTrigger, Tooltip, Popover } from 'react-bootstrap';
import { MDBIcon } from 'mdbreact';
import { AdditionalDetails } from '.';
let active = true;

class TripComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = { isHovering: false, cardSize: 'light', isVisible: false };
    this.toggleInfo = this.toggleInfo.bind(this);
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }
  toggleInfo() {
    this.setState({
      isVisible: !this.state.isVisible
    });
  }

  toggleHoverState(state) {
    if (!this.state.isHovering) {
      this.setState({ cardSize: 'primary' });
    } else {
      this.setState({ cardSize: 'light' });
    }
    return {
      isHovering: !state.isHovering
    };
  }

  render() {
    if (!this.props.details) {
      return null;
    }
    return (
      <div>
        <div
          style={{ paddingTop: '20px', paddingBottom: '10px' }}
          onMouseEnter={this.handleMouseHover}
          onMouseLeave={this.handleMouseHover}
        >
          {/* Angelas border hover to add above: border={this.state.cardSize}*/}

          <Card style={{ width: '97%', marginLeft: '0.3%' }}>
            {/* Angelas thing: border={this.state.cardSize}*/}
            <Card.Body>
              <Row>
                <Col xs={12} md={5}>
                  {this.props.details.origin.location.name.length > 15 && (
                    <Card.Title class="small">{this.props.details.origin.location.name.substring(0, 12)} ...</Card.Title>
                  )}
                  {this.props.details.origin.location.name.length < 15 && (
                    <Card.Title class="small">{this.props.details.origin.location.name}</Card.Title>
                  )}
                </Col>
                <Col xs={12} md={2}>
                  <Card.Title>
                    <MDBIcon icon="arrow-right" />{' '}
                  </Card.Title>
                </Col>
                <Col xs={6} md={5}>
                  <Card.Title class="small"> {this.props.details.destination.location.name} </Card.Title>
                </Col>
              </Row>
              <Row>
                <Col xs={12} md={7}>
                  <Card.Subtitle>
                    <i class="far fa-calendar-alt"></i> {this.props.details.posted_time.$date}{' '}
                  </Card.Subtitle>
                  <Card.Text>
                    {' '}
                    {'\xa0\xa0\xa0\xa0'}@{this.props.details.start_time}
                  </Card.Text>
                </Col>
                <Col xs={6} md={5}>
                  <Card.Subtitle>{this.props.details.driver.users.name}</Card.Subtitle>
                  <Card.Text>
                    <i class="fas fa-users"></i> {'\xa0'} {this.props.details.seats_available}
                  </Card.Text>
                </Col>
              </Row>
              <Card.Subtitle class="text-black"> Notes:</Card.Subtitle>
              {this.props.details.notes.length > 100 && (
                <Card.Text>{this.props.details.notes.substring(0, 97)} ...</Card.Text>
              )}
              {this.props.details.notes.length <= 100 && <Card.Text> {this.props.details.notes}</Card.Text>}

              <Row>
                <Col xs={12} md={7}>
                  <Card.Link style={{ color: 'blue' }}>Book Now!</Card.Link>
                </Col>
                <Col xs={6} md={5}>
                  <Card.Link onClick={this.props.onClick} name={this.props.details.id} style={{ color: 'blue' }}>
                    More Info
                  </Card.Link>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </div>
        {/* {this.state.isVisible && <AdditionalDetails details={this.props.details}/>} */}
      </div>
    );
  }
}

export default TripComponent;
