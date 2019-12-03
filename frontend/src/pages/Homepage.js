import React from 'react';
import { FilterBar, AdditionalDetails } from '../components';
import TripComponent from '../components/TripComponent.js';
import { Row, Col } from 'reactstrap';
import { getTrips } from '../Requests/requests.js'

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTrips: [],
      currentTrip: null
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

    this.setState({allTrips: allTrips});

  }

  handleClickAD(trip) {
    this.setState({ currentTrip: trip });
  }

  render() {


    return (
      <div class="filter">
        <Row>
          <Col xs="3">
            <FilterBar />
          </Col>
          <Col xs="3">
            <b style={{ textAlign: 'center' }}>Active Trips</b>

          {this.state.allTrips.length == 0 ?
            <h5>There are no active trips.</h5> :
            this.state.allTrips.map(function(value) {
              return <TripComponent onClick={() => this.handleClickAD(value)} details={value} />
            }
          )}

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
    );
  }
}

export default Homepage;
