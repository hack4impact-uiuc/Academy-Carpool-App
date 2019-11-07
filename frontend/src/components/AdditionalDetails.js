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
  Badge
} from 'reactstrap';
class AdditionalDetails extends React.Component {
  render() {
    return (
      <div>
        <b>Additional Information</b>
        <div className="additionaldetails">
          <div className="infocard">
            <Card>
              <CardBody>
                <CardTitle>
                  <b className="drivername"> {this.props.details.currentTrip.name}</b>
                  <b className="costinfo"> ${this.props.details.currentTrip.cost} </b>
                </CardTitle>
                <CardSubtitle>Venmo: {this.props.details.currentTrip.venmo}</CardSubtitle>
                <hr />
                <div className="starttoend">
                  <b>
                    {' '}
                    {this.props.details.currentTrip.origin} &#8594;{this.props.details.currentTrip.destination}{' '}
                  </b>
                </div>
                <div className="datentime">
                  @ <b>{this.props.details.currentTrip.time}</b> on <b>{this.props.details.currentTrip.date}</b>
                </div>
                <br />
                <div>
                  <b>Car Model: </b> {this.props.details.currentTrip.model} <br />
                  <b>Color: </b> {this.props.details.currentTrip.color} <br />
                  <b>Seats Available: </b> {this.props.details.currentTrip.seats}
                  <br />
                  <b>Trunk Space: </b> {this.props.details.currentTrip.space}
                  <br />
                  <b>Special Instructions: </b> {this.props.details.currentTrip.notes} <br />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}
export default AdditionalDetails;
