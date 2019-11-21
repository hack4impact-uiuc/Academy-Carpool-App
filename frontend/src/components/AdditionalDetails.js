import React from 'react';
import { CardBody, CardSubtitle, Card, CardTitle, Container } from 'reactstrap';
import MapContainer from './MapContainer';
class AdditionalDetails extends React.Component {
  render() {
    return (
      <div>
        <b style={{ textAlign: 'center' }}>Additional Information</b>
        <div className="infocard" style={{ paddingTop: '20px' }}>
          <Card>
            <CardBody>
              <CardTitle>
                <b className="drivername"> {this.props.details.name}</b>
                <b className="costinfo"> ${this.props.details.cost} </b>
              </CardTitle>
              <CardSubtitle>Venmo: {this.props.details.venmo}</CardSubtitle>
              <hr />
              <div className="starttoend">
                <b>
                  {' '}
                  {this.props.details.origin} &#8594;{this.props.details.destination}{' '}
                </b>
              </div>
              <div className="datentime">
                @ <b>{this.props.details.time}</b> on <b>{this.props.details.date}</b>
              </div>
              <br />
              <Container>
                <div>
                  <b>Car Model: </b>
                  {this.props.details.make} {this.props.details.model} <br />
                  <b>Color: </b> {this.props.details.color} <br />
                  <b>License Plate: </b> {this.props.details.plate} <br />
                  <b>Seats Available: </b> {this.props.details.seats}
                  <br />
                  <b>Trunk Space: </b> {this.props.details.space}
                  <br />
                  <b>Special Instructions: </b> {this.props.details.notes} <br />
                </div>
                <iframe
                  title="map"
                  className="map"
                  src={`https://maps.google.com/maps?q=${this.props.details.destination}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
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
