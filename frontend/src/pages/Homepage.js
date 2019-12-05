import React from 'react';
import { FilterBar, TripList, AdditionalDetails } from '../components';
import TripComponent from '../components/TripComponent.js';
import SignUp from './SignUp.js';
import BookTripComponent from '../components/BookTripComponent';
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
import { getTrips } from '../Requests/requests.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //visibility of Book Trip module
      bookTripVisibility: false,
      //Filters
      mapHeight: 0,
      filterPrice: '1000',
      filterDest: 'Red Lion',
      filterSeat: '1000'
    };

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleClickAD = this.handleClickAD.bind(this);
    this.handlePrice = this.handlePrice.bind(this);
    this.handleDest = this.handleDest.bind(this);
    this.handleSeat = this.handleSeat.bind(this);
  }

  async componentDidMount() {
    let tripsArray = await getTrips();

    let allTrips = [];

    tripsArray.forEach(trip => {
      allTrips.push(trip);
    });

    if (allTrips.length > 0) {
      this.setState({ currentTrip: allTrips[0] });
    }

    console.log(allTrips);

    this.setState({ allTrips: allTrips });
  }

  async componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);

    let tripsArray = await getTrips();
    let allTrips = [];

    tripsArray.forEach(trip => {
      allTrips.push(trip);
    });

    if (allTrips.length > 0) {
      this.setState({ currentTrip: allTrips[0] });
    }

    this.setState({ allTrips: allTrips });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ height: window.innerHeight });
    this.setState({ mapheight: window.innerHeight / 1.25 });
  }
  handlePrice = this.handlePrice.bind(this);
  handleDest = this.handleDest.bind(this);
  handleSeat = this.handleSeat.bind(this);

  handleClickAD(trip) {
    this.setState({ currentTrip: trip });
  }
  handlePrice(event) {
    this.setState({ filterPrice: event.target.value });
  }
  handleDest(event) {
    this.setState({ filterDest: event.target.value });
  }
  handleSeat(event) {
    this.setState({ filterSeat: event.target.value });
  }

  retRedirect = () => {
    console.log('Hello');
    return <Redirect to="/signup" />;
  };

  handleClickBookTrip(trip) {
    this.setState({ currentTrip: trip });
    this.setState({ bookTripVisibility: true });
  }

  myCallback = visibilityfromBookTripComponent => {
    this.setState({ bookTripVisibility: visibilityfromBookTripComponent });
  };

  handlePrice(event) {
    this.setState({ filterPrice: event.target.value });
    setTimeout(() => {
      console.log(this.state.filterPrice);
    }, 2000);
  }
  handleDest(event) {
    this.setState({ filterDest: event.target.value });
  }
  handleSeat(event) {
    this.setState({ filterSeat: event.target.value });
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
        {console.log(this.state.bookTripVisibility)}
        <div class="filter" style={{ background: '#ededed', paddingTop: '1%', width: '100%' }}>
          {/* "#E7E7F8" */}
          <div>
            <Row>
              <Col xs="3">
                <FilterBar price={this.handlePrice} dest={this.handleDest} seat={this.handleSeat} />
              </Col>
              <Col xs="3">
                <b style={{ textAlign: 'center' }}>Active Trips</b>
                <div style={{ height: `${this.state.mapheight}px`, overflowY: 'auto' }}>
                  {this.state.allTrips.map(value => {
                    if (this.state.filterPrice == '') {
                      this.setState({ filterPrice: '1000' });
                    }
                    if (this.state.filterSeat == '') {
                      this.setState({ filterSeat: '0' });
                    }
                    if (
                      parseFloat(value.cost) <= parseFloat(this.state.filterPrice) &&
                      parseFloat(value.seats) >= parseFloat(this.state.filterSeat) &&
                      (value.destination.toLowerCase().includes(this.state.filterDest.toLowerCase()) ||
                        this.state.filterDest == '')
                    )
                      return <TripComponent onClick={() => this.handleClickAD(value)} details={value} />;
                  })}
                </div>
              </Col>
              <Col>
                <AdditionalDetails details={this.state.currentTrip} />
              </Col>
            </Row>
            {this.state.bookTripVisibility && (
              <BookTripComponent visible={true} details={this.state.currentTrip} callbackFromParent={this.myCallback} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
