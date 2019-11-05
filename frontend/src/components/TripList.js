import React from 'react';
import {CardBody, CardSubtitle,Card, CardTitle, CardText,Button,Table, Row, Col, FormGroup, Label, Input, Toast, ToastBody, ToastHeader, Badge} from 'reactstrap';
class TripList extends React.Component {
  render() {
    return (
        <div>
        <b class='postsheader'>Active Trips</b>
        <div className="p-3 my-2 rounded">
          { <Toast>
            <ToastHeader>
              County Market
            </ToastHeader>
            <ToastBody>
              <Row>
                <Col className='cost' xs='3'>
                  <b>$5</b>
                </Col>
                <Col className='toastinfo' xs='5'>
                  <Row>
                    <b>Start: &nbsp;</b> West Quad Apt
                  </Row>
                  <Row>
                    <b>Time: &nbsp;</b> 6:30 PM 
                  </Row>
                  <Row>
                    <b>Date: &nbsp;</b> 10/31/19
                  </Row>
                </Col>
                <Col className='moreinfo'>
                <Button color="secondary" size="sm" active>More Info</Button>
                </Col>
              </Row>
            </ToastBody>
          </Toast> }
        </div>
        </div>
    );
  }
}
export default TripList;