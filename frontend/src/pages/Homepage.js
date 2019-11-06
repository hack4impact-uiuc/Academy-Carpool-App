import React from 'react';
import {FilterBar, TripList, AdditionalDetails} from '../components'
import {CardBody, CardSubtitle,Card, CardTitle, CardText,Button,Table, Row, Col, FormGroup, Label, Input, Toast, ToastBody, ToastHeader, Badge} from 'reactstrap';
class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            currentTrip: {Trip},
            allTrips: [ {Trips} ]
        }
    }
    render() {
        return (
            <div class = "filter">
                <Row>  
                    <Col xs='3'>
                        <FilterBar/>
                    </Col>
                    <Col xs='4'>
                        <TripList/>
                    </Col>
                    <Col>
                    <AdditionalDetails details ={this.state}/>
                    </Col>
                </Row>
                {/*insert function for allTrips and send values to Angela's component*/}
            </div>
        );
    }
}

export default Homepage;