import Homepage from './pages/Homepage.js';
import SignUp from './pages/SignUp.js';
import TripFormPage from './pages/TripFormPage.js';

import logo from './logo.svg';
import './App.css';
import React from 'react';
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
} from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
class App extends React.Component {
  render() {
    return (
      
          
          <Router>
            <div style={{backgroundColor: "white"}}>
            <div className="websitetitle">
              <b>Carpool4UIUC</b>
                  <Link to='/login' style={{color:"white"}}>
                    <Button color="primary" style={{float:"right", marginRight: "1%" }}>
                      Login
                  </Button>
                  </Link>
                  <Link to='/trips' style={{color:"white"}}>
                     <Button color="primary" style={{float:"right", marginRight: "0.5%" }}>
                        Trips
                      </Button>
                  </Link>
                  <Link to='/addtrip' style={{color:"white"}}>
                    <Button color="primary" style={{float:"right", marginRight: "0.5%" }}>
                      Add Trip
                    </Button>
                  </Link>
                  {/* <ul style={{display: "inline"}}>
                    <li><Link to={'/trips'} className="nav-link"> Trips </Link></li>
                    <li><Link to={'/signup'} className="nav-link">SignUp</Link></li>
                  </ul> */}
              </div>
              <Switch>
                <Route exact path='/trips' component={Homepage} />          
                <Route path='/login' component={SignUp} />  
                <Route path='/addtrip' component={TripFormPage} />        
              </Switch>
              </div>
          </Router>
          
     
        
    );
  }
}

export default App;
