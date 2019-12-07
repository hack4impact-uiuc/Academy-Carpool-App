import React from 'react';
import { FilterBar, TripList, AdditionalDetails } from '../components';
import TripComponent from '../components/TripComponent.js';
import SignUp from './SignUp.js';
import BookTripComponent from '../components/BookTripComponent.js';
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
<<<<<<< HEAD
<<<<<<< HEAD
      //currentTrip: null,
      allTrips: [],

      currentTrip: {
        origin: 'West Quad',
        destination: 'County Market',
        venmo: 'Ashank-Behara',
        cost: '5',
        model: 'Prius',
        seats: '3',
        space: 'empty',
        color: 'blue',
        make: 'Toyota',
        notes: 'Meet me in the back entrance behind the building. If you arrive late I will leave.',
        name: 'Ashank Behara',
        date: '11/4/19',
        time: '6:30',
        plate: 'XXXX'
      }
      // allTrips: [
      //   {
      //     origin: 'West Quad',
      //     destination: 'County Market',
      //     venmo: 'Ashank-Behara',
      //     cost: '5',
      //     model: 'Prius',
      //     seats: '3',
      //     space: 'empty',
      //     color: 'blue',
      //     make: 'Toyota',
      //     notes: 'Meet me in the back entrance behind the building. If you arrive late I will leave.',
      //     name: 'Ashank Behara',
      //     date: '11/4/19',
      //     time: '6:30',
      //     plate: 'XXXX',
      //     id: '0'
      //   },
      //   {
      //     origin: 'Schlopkins',
      //     destination: 'Red Lion',
      //     venmo: 'Angela-Luo',
      //     cost: '24',
      //     model: 'Lancer',
      //     seats: '1',
      //     space: 'full',
      //     color: 'white',
      //     make: 'Mitsubishi',
      //     notes: 'I take preworkout before I drink.',
      //     name: 'Angela-Luo',
      //     date: '11/7/19',
      //     time: '4:20',
      //     plate: 'XXXX',
      //     id: '1'
      //   },
      //   {
      //     origin: '606E Stoughton',
      //     destination: 'Citadel',
      //     venmo: 'Shreyas-Mohan',
      //     cost: '83',
      //     model: 'Fit',
      //     seats: '2',
      //     space: 'empty',
      //     color: 'blue',
      //     make: 'Honda',
      //     notes: 'breh',
      //     name: 'Shreyas Mohan',
      //     date: '11/13/19',
      //     time: '5:47',
      //     plate: 'XXXX',
      //     id: '2'
      //   }
      // ]
    };

    this.loadTrips();
    //this.state = {allTrips: [trips]}
  }
  
  async loadTrips(){
    let trips = await getTrips();

    let tripsArray = trips.result.trips;

    let allTrips = this.state.allTrips;

    tripsArray.forEach(trip => {
      allTrips.append(trip);
    });

    this.setState({allTrips: allTrips});

=======
=======
      bookTripVisibility: false,
>>>>>>> 6ea3f921b99540ab3d40f8107a5b655f736d4ee1
      allTrips: [],
      currentTrip: null,
      //Filters
      mapHeight: 0,
      filterPrice: '1000',
      filterDest: '',
      filterSeat: '0'
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
>>>>>>> 91d03944fe64d7c56b15cf87f5a038684e70343d
  }

  handleClickAD(trip) {
    this.setState({ currentTrip: trip });
  }

  handleClickBookTrip(trip) {
    this.setState({ currentTrip: trip });
    this.setState({ bookTripVisibility: true });
  }

  myCallback = visibilityfromBookTripComponent => {
    this.setState({ bookTripVisibility: visibilityfromBookTripComponent });
  };

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

  getTripPanelContents() {
    if(this.state.allTrips.length == 0) {
      return <h5>There are no active trips.</h5>
    }

    let elements = []

    {this.state.allTrips.map(value => {
      elements.append(<TripComponent onClick={() => this.handleClickAD(value)} details={value} />);
    })}

    return elements;
  }

  render() {
    return (
<<<<<<< HEAD
      <div class="filter">
        <Row>
          <Col xs="3">
            <FilterBar />
          </Col>
          <Col xs="3">
            <b style={{ textAlign: 'center' }}>Active Trips</b>
            {this.getTripPanelContents()}
          </Col>
          <Col>
            <AdditionalDetails details={this.state.currentTrip} />
          </Col>
        </Row>
=======
      <div>
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
                      parseFloat(value.seats_available) >= parseFloat(this.state.filterSeat) &&
                      (value.destination.location.name.toLowerCase().includes(this.state.filterDest.toLowerCase()) ||
                        this.state.filterDest == '')
                    )
                      return (
                        <TripComponent
                          onClick={() => this.handleClickAD(value)}
                          onClickBook={() => this.handleClickBookTrip(value)}
                          details={value}
                        />
                      );
                  })}
                </div>
              </Col>
              <Col>
                {this.state.currentTrip == null ? (
                  <h5>There are no trip details to display.</h5>
                ) : (
                  <AdditionalDetails details={this.state.currentTrip} />
                )}
              </Col>
            </Row>
            {this.state.bookTripVisibility && (
              <BookTripComponent visible={true} details={this.state.currentTrip} callbackFromParent={this.myCallback} />
            )}
          </div>
        </div>
>>>>>>> 91d03944fe64d7c56b15cf87f5a038684e70343d
      </div>
    );
  }
}

export default Homepage;
