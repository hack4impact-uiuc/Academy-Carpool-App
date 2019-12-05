import React from 'react';
import { FilterBar, TripList, AdditionalDetails } from '../components';
import TripComponent from '../components/TripComponent.js';
import SignUp from './SignUp.js';
import BookTripComponent from '../components/BookTripComponent'
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
      //visibility of Book Trip module
      bookTripVisibility: false,
      //Filters
      mapHeight: 0,
      filterPrice: '1000',
      filterDest: 'Red Lion',
      filterSeat: '1000',

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
  updateWindowDimensions = this.updateWindowDimensions.bind(this);
    componentDidMount() {
      this.updateWindowDimensions();
      window.addEventListener('resize', this.updateWindowDimensions);
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }
    updateWindowDimensions() {
      this.setState({height: window.innerHeight });
      this.setState({mapheight: window.innerHeight/1.25 });
     }
  handlePrice = this.handlePrice.bind(this);
  handleDest = this.handleDest.bind(this);
  handleSeat = this.handleSeat.bind(this);

  handleClickAD(trip) {
    this.setState({ currentTrip: trip });
  }

  handleClickBookTrip(trip) {
    this.setState({ currentTrip: trip });
    this.setState({bookTripVisibility: true})
  }

  myCallback = (visibilityfromBookTripComponent) => {
    this.setState({ bookTripVisibility: visibilityfromBookTripComponent });
  }

  handlePrice(event) {
    
    this.setState({filterPrice: event.target.value});
    setTimeout(() => {console.log(this.state.filterPrice);}, 2000);
    
    
  }
  handleDest(event) {
    this.setState({ filterDest : event.target.value});
  }
  handleSeat(event) {
    this.setState({filterSeat: event.target.value});
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
                <FilterBar price={this.handlePrice} dest={this.handleDest} seat={this.handleSeat}/>
              </Col>
              <Col xs="3">
                <b style={{ textAlign: 'center' }}>Active Trips</b>
                <div style={{ height: `${this.state.mapheight}px`, overflowY: 'auto' }}>
                  {this.state.allTrips.map(value => {
                    return <TripComponent onClick={() => this.handleClickAD(value)} 
                    onClickBook = {() => this.handleClickBookTrip(value)}
                    details={value} />;
                  })}
                </div>
              </Col>
              <Col>
                <AdditionalDetails details={this.state.currentTrip} />
              </Col>
            </Row>
            { this.state.bookTripVisibility 
              && (<BookTripComponent visible = {true} details = {this.state.currentTrip} callbackFromParent={this.myCallback}/>)}
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
