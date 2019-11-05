//yarn add react-bootstrap bootstrap
//yarn add mdbreact

import React, { Component } from 'react'
//import { Card, Button, CardTitle, CardText, CardHeader} from 'reactstrap';
import { Card, Button } from 'react-bootstrap';
import {MDBIcon} from 'mdbreact'

        
class TripComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
      }
    
    /*add price, seats*/ 
    /* <CardText>Driver: {this.props.driver.name}</CardText> */
    render() {
        return (
        <div> 
                <div>
                    
                    {/* <Card body outline color="secondary" style={{width:"20%", backgroundColor: 'white'}}>
                        <Card width = "100%" style={{ backgroundColor: 'powderblue'}}>
                            <CardHeader>{this.props.orgin} -> {this.props.destination}</CardHeader>
                        
                        </Card>
                    <CardTitle>{this.props.orgin} -> {this.props.destination}</CardTitle>
                    <CardText>Date: {this.props.date} @ {this.props.time}</CardText>
                    
                    <Button>Select</Button>
                    </Card> */}
                    {/* <Card style={{ width: '18rem' }}>
                        {/* should i be adding spaces like this?? */}
                        {/*
                        <Card.Header>{this.props.orgin} {'\xa0\xa0\xa0'} <MDBIcon icon="arrow-right" />  {'\xa0\xa0\xa0'} {this.props.destination}
                                 </Card.Header>
                        <Card.Body >
                        
                        <Card.Subtitle><i class="far fa-calendar-alt"></i> {this.props.date}</Card.Subtitle>
                        <Card.Text> {'\xa0\xa0\xa0\xa0\xa0'}{this.props.time}</Card.Text>
                        <Card.Title class="small"> ${this.props.price} {'\xa0\xa0\xa0'} <Button variant="link">Expand</Button></Card.Title>
                        </Card.Body>
                    </Card> */}
                     {/* <Card style={{ width: '19rem' }}>
                        <Card.Body>
                            <Card.Title>{this.props.orgin} {'\xa0\xa0\xa0'} <MDBIcon icon="arrow-right" />  {'\xa0\xa0\xa0'} {this.props.destination}</Card.Title>
                            <Card.Subtitle><i class="far fa-calendar-alt"></i> {this.props.date}</Card.Subtitle>
                            <Card.Text> {'\xa0\xa0\xa0\xa0\xa0'}{this.props.time}</Card.Text>
                            <Card.Subtitle className="mb-2 text-muted">{this.props.name}</Card.Subtitle>
                            <Card.Text>
                            <i class="fas fa-users"></i> {'\xa0'} {this.props.seats}
                            </Card.Text>
                            <Card.Link href="#">Card Link</Card.Link>
                            <Card.Link href="#">Another Link</Card.Link>
                        </Card.Body>
                    </Card>  */}

                    <Card style={{ width: '19rem' }}>
                        <Card.Body>
                            <div class="row justify-content-start">
                                <div class="col-md-auto">
                                <Card.Title>{this.props.orgin}</Card.Title>
                                
                                <Card.Subtitle><i class="far fa-calendar-alt"></i> {this.props.date} </Card.Subtitle>
                                <Card.Text> {'\xa0\xa0\xa0\xa0\xa0'}{this.props.time}</Card.Text>
                                </div>
                                <div class="col-md-auto">
                                <Card.Title><MDBIcon icon="arrow-right" /> </Card.Title> 
                                </div>
                                <div class="col-md-auto">
                                <Card.Title> {this.props.destination} </Card.Title>
                                <Card.Subtitle>{this.props.name}</Card.Subtitle>
                                <Card.Text><i class="fas fa-users"></i> {'\xa0'} {this.props.seats}</Card.Text>
                                </div>
                            </div>
                            
                            <Card.Subtitle class="text-black"> Notes:</Card.Subtitle>
                            <Card.Text> {this.props.notes}</Card.Text>
                            <Card.Link href="#">Book Now!</Card.Link>
                            {'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0'}
                            <Card.Link href="#">More Info</Card.Link>
                        </Card.Body>
                    </Card>
                    
                    
                </div>  
            
            </div>
        );
    }
  }
 
export default TripComponent;
