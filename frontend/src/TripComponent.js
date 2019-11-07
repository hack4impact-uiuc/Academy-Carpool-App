//yarn add react-bootstrap bootstrap
//yarn add mdbreact
//yarn add semantic-ui-react

import React, { Component } from 'react'
//import { Card, Button, CardTitle, CardText, CardHeader} from 'reactstrap';
import { Card, Button, Row, Col, OverlayTrigger, Tooltip, Popover} from 'react-bootstrap';
import {MDBIcon} from 'mdbreact'

        
class TripComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleMouseHover = this.handleMouseHover.bind(this)
        this.state = { isHovering: false, 
                        cardSize: 'light'
                                    };
      }
      handleMouseHover() {
        this.setState(this.toggleHoverState);
      }
    
      toggleHoverState(state) {
        if (!this.state.isHovering) {
            this.setState({cardSize: 'primary'});
        } else {
            this.setState({cardSize: 'light'});
        }
        return {
          isHovering: !state.isHovering,
        };
      }
    
    
    render() {
        
        return (
        <div> 
                <div 
                onMouseEnter={this.handleMouseHover}
                onMouseLeave={this.handleMouseHover}> 
                
                     <Card border= {this.state.cardSize} style={{ width: '22rem' }}> 
                    
                        <Card.Body>
                            
                            <Row>
                                    <Col xs={12} md={5}>
                                     {this.props.orgin.length > 15 && 
                                     <Card.Title class = "small">{this.props.orgin.substring(0, 12)} ...</Card.Title>
                                    }
                                    {this.props.orgin.length < 15 && 
                                     <Card.Title class = "small">{this.props.orgin}</Card.Title>
                                    }
                                    </Col>
                                    <Col xs={12} md={2}>
                                    <Card.Title  ><MDBIcon icon="arrow-right" /> </Card.Title>
                                    </Col>
                                    <Col xs={6} md={5}>
                                    <Card.Title class = "small"> {this.props.destination} </Card.Title> 
                                    </Col>
                            </Row>
                                <Row>
                                    <Col xs={12} md={7}>
                                    <Card.Subtitle><i class="far fa-calendar-alt"></i> {this.props.date} </Card.Subtitle>
                                    <Card.Text> {'\xa0\xa0\xa0\xa0\xa0'}{this.props.time}</Card.Text>
                                    </Col>
                                    <Col xs={6} md={5}>
                                    <Card.Subtitle>{this.props.name}</Card.Subtitle>
                                    <Card.Text><i class="fas fa-users"></i> {'\xa0'} {this.props.seats}</Card.Text>
                                    </Col>
                                </Row>
                            <Card.Subtitle class="text-black"> Notes:</Card.Subtitle>
                            {/* <Card.Text> {this.props.notes}</Card.Text> */}
                            {/* <OverlayTrigger key={'right'} placement={'right'} overlay={<Tooltip id={`tooltip-${'right'}`}>{this.props.notes}</Tooltip>}>
                            <span className="d-inline-block"> */}
                                    {this.props.notes.length > 100 && 
                                        <Card.Text>{this.props.notes.substring(0, 97)} ...</Card.Text>
                                    }
                            {/* </span>
                            </OverlayTrigger> */}
                                    {this.props.notes.length < 100 && 
                                        <Card.Text> {this.props.notes}</Card.Text>
                                    }
                                    
                            
                                <Row>
                                    <Col xs={12} md={7}>
                                    <Card.Link href="#">Book Now!</Card.Link>
                                    </Col>
                                    <Col xs={6} md={5}>
                                        
                                        <Card.Link href="#">More Info</Card.Link>
                                        
                                    </Col>
                                    
                                </Row>
                        </Card.Body>
                    </Card>
                
                </div>
            </div>
        );
    }
  }
 
export default TripComponent;
