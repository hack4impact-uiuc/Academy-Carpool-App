import React from 'react';
import TripComponent from './TripComponent.js';
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
class TripList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (!this.props.details) {
      return null;
    }
    return (
      <div>
        <b style={{ textAlign: 'center' }}>Active Trips</b>
        {this.props.trips.map(value => {
          return <TripComponent details={value} />;
        })}
      </div>
    );
  }
}
export default TripList;
