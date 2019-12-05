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
import { getTrips } from '../Requests/requests.js';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

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

  render() {
    return (
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
                      return <TripComponent onClick={() => this.handleClickAD(value)} details={value} />;
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
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
