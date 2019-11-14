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
class FilterBar extends React.Component {
  render() {
    return (
      <div>
        <b style={{textAlign:"center"}}>Filters</b>
        <br />
        <div className="filterpanel">
          <FormGroup row>
            <Label for="price" sm={4}>
              Max Price
            </Label>
            <Col sm={8}>
              <Input id="price" placeholder="Enter a Price" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="destination" sm={4}>
              Destination
            </Label>
            <Col sm={8}>
              <Input id="destination" placeholder="Enter a Destination" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="seats" sm={4}>
              Seats Left
            </Label>
            <Col sm={8}>
              <Input id="seats" placeholder="Enter a Seat Number" />
            </Col>
          </FormGroup>
        </div>
      </div>
    );
  }
}
export default FilterBar;
