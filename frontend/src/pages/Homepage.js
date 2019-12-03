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
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Filters
      filterPrice: '',
      filterDest: '',
      filterSeat: '',

      //current trip
      currentTrip: {
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

      //All trips
      allTrips: [
        {
          origin: 'West Quad',
          destination: 'State Farm Center',
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
          destination: 'Canopy Club',
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
          origin: 'West Quad',
          destination: 'State Farm Center',
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
          destination: 'Canopy Club',
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
          origin: 'West Quad',
          destination: 'State Farm Center',
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
        }
      ]
    };
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
                <AdditionalDetails details={this.state.currentTrip} />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
