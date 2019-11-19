import React from 'react';
import { FilterBar, AdditionalDetails } from '../components';
import TripComponent from '../components/TripComponent.js';
import { Row, Col } from 'reactstrap';
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      },
      allTrips: [
        {
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
          plate: 'XXXX',
          id: '0'
        },
        {
          origin: 'Schlopkins',
          destination: 'Red Lion',
          venmo: 'Angela-Luo',
          cost: '24',
          model: 'Lancer',
          seats: '1',
          space: 'full',
          color: 'white',
          make: 'Mitsubishi',
          notes: 'I take preworkout before I drink.',
          name: 'Angela-Luo',
          date: '11/7/19',
          time: '4:20',
          plate: 'XXXX',
          id: '1'
        },
        {
          origin: '606E Stoughton',
          destination: 'Citadel',
          venmo: 'Shreyas-Mohan',
          cost: '83',
          model: 'Fit',
          seats: '2',
          space: 'empty',
          color: 'blue',
          make: 'Honda',
          notes: 'breh',
          name: 'Shreyas Mohan',
          date: '11/13/19',
          time: '5:47',
          plate: 'XXXX',
          id: '2'
        }
      ]
    };
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
            {this.state.allTrips.map(value => {
              return <TripComponent onClick={() => this.handleClickAD(value)} details={value} />;
            })}
          </Col>
          <Col>
            <AdditionalDetails details={this.state.currentTrip} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Homepage;
