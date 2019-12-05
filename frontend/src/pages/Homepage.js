import React from 'react';
import { FilterBar, TripList, AdditionalDetails } from '../components';
import TripComponent from '../components/TripComponent.js';
import SignUp from './SignUp.js';
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
  Badge,
  Section
} from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { getTrips } from '../Requests/requests.js'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTrips: [],
      currentTrip: null,
      //Filters
      filterPrice: '',
      filterDest: '',
      filterSeat: ''
    };
    
    this.handleClickAD = this.handleClickAD.bind(this);
  }
  
  async componentDidMount(){
    let tripsArray = await getTrips();

    let allTrips = [];

    tripsArray.forEach(trip => {
      allTrips.push(trip);
    });

    if(allTrips.length > 0) {
      this.setState({currentTrip: allTrips[0]});
    }

    console.log(allTrips);

    this.setState({allTrips: allTrips});

  }

  handleClickAD(trip) {
    this.setState({ currentTrip: trip });
  }

  handleFilter() {
    this.setState();
  }

  retRedirect = () => {
    console.log('Hello');
    return <Redirect to="/signup" />;
  };

  render() {


    return (
      <div>
        {/* <div style={{backgroundColor: "white"}}>
        <div className="websitetitle">
          <b>Carpool4UIUC</b>
          <Router>
            <Button color="success" style={{float:"right", marginRight: "2.5%" }}>
              <Link to='/signup' style={{color:"white"}}>Sign Up</Link>
            </Button>
              <Switch>
                <Route path='/signup' component={SignUp}/>            
              </Switch>
          </Router>
          
        </div>
      </div> */}
        <div class="filter" style={{ background: '#ededed', paddingTop: '1%', width: '100%' }}>
          {/* "#E7E7F8" */}
          <div>
            <Row>
              <Col xs="3">
                <FilterBar />
              </Col>
              <Col xs="3">
                <b style={{ textAlign: 'center' }}>Active Trips</b>

                <div style={{ height: '730px', overflowY: 'auto' }}>
                  {this.state.allTrips.map(value => {
                    return <TripComponent onClick={() => this.handleClickAD(value)} details={value} />;
                  })}
                </div>
              </Col>
              <Col>
                {
                  this.state.currentTrip == null ?
                  <h5>There are no trip details to display.</h5> :
                  <AdditionalDetails details={this.state.currentTrip} />
                }
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
