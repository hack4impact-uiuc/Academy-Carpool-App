import React from 'react';
import {CardBody, CardSubtitle,Card, CardTitle, CardText,Button,Table, Row, Col, FormGroup, Label, Input, Toast, ToastBody, ToastHeader, Badge} from 'reactstrap';
class AdditionalDetails extends React.Component {
    render() {
    return (
      <div>
      <b>Additional Information</b>
      <div className= 'additionaldetails'>
        <div className="infocard">
      <Card>
        <CardBody>
          <CardTitle>
            <b  className ='drivername'> {this.props.details.name}</b>
            <b className = 'costinfo'> ${this.props.details.cost} </b>
          </CardTitle>
          <CardSubtitle>
            Venmo: {this.props.details.venmo}
          </CardSubtitle>
          <hr/>
          <div className = 'starttoend'>
            <b> {this.props.details.origin} &#8594;{this.props.details.destination} </b>
          </div>
          <div className='datentime'>
              @ <b>{this.props.details.time}</b> on <b>{this.props.details.date}</b>
          </div>
          <br/>
          <div>
            <b>Car Model: </b> {this.props.details.model} <br/>
            <b>Color: </b> {this.props.details.color} <br />
            <b>Seats Available: </b> {this.props.details.seats}<br />
            <b>Trunk Space: </b> {this.props.details.space}<br />
            <b>Special Instructions: </b> {this.props.details.notes} <br />

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