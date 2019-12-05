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
  Badge,
  Container
} from 'reactstrap';
import MapContainer from './MapContainer';
class AdditionalDetails extends React.Component {
  render() {
    return (
      <div>
        <b style={{ textAlign: 'center' }}>Additional Information</b>
        <div className="infocard" style={{ paddingTop: '2.5%', paddingBottom: '25%' }}>
          <Card>
            <CardBody>
              <CardTitle>
                <b className="drivername"> {this.props.details.origin.location.name}</b>
                <b className="costinfo"> ${this.props.details.cost} </b>
              </CardTitle>
              <CardSubtitle>Venmo: {this.props.details.driver.users.venmo}</CardSubtitle>
              <hr />
              <div className="starttoend">
                <b>
                  {' '}
                  {this.props.details.origin.location.name} &#8594;{this.props.details.destination.location.name}{' '}
                </b>
              </div>
              <div className="datentime">
                @ <b>{this.props.details.start_time}</b> on <b>{this.props.details.start_date}</b>
              </div>
              <br />
              <Container>
                <div>
                  <b>Car Model: </b>
                  {this.props.details.car.model}
                  <br />
                  <b>Color: </b> {this.props.details.car.color} <br />
                  <b>License Plate: </b> {this.props.details.car.license_plate} <br />
                  <b>Seats Available: </b> {this.props.details.seats_available}
                  <br />
                  <b>Trunk Space: </b> {this.props.details.trunk_space}
                  <br />
                  <b>Special Instructions: </b> {this.props.details.notes} <br /> <br />
                </div>
                <iframe
                  className="map"
                  src={`https://maps.google.com/maps?q=${this.props.details.destination.location.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  style={{ height: '325px' }}
                >
                  <MapContainer style={{ float: 'center' }} />
                </iframe>
              </Container>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}
export default AdditionalDetails;
