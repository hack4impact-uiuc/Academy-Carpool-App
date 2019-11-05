import React from 'react';
import {FilterBar, TripList, AdditionalDetails} from '../components'
import {CardBody, CardSubtitle,Card, CardTitle, CardText,Button,Table, Row, Col, FormGroup, Label, Input, Toast, ToastBody, ToastHeader, Badge} from 'reactstrap';
class Homepage extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            all_trips: [],
            origin: "West Quad",
            destination: "County Market",
            venmo: "Ashank-Behara",
            cost: "5",
            model: "Toyota Prius",
            seats: "3",
            space: "empty",
            color: "blue",
            notes: "Meet me in the back entrance behind the building. If you arrive late I will leave.",
            name: "Ashank Behara",
            date: "11/4/19",
            time: "6:30"
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
                
            
                {/* {this.state.all_trips.map((value) => {
                    return (
                    
                    );
                })} */}
            </div>
        );
    }
}

export default Homepage;