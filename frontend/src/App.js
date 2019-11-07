import React from 'react';
import logo from './logo.svg';
import './App.css';
import TripComponent from './TripComponent';

class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      orgin:"Shlopkins", 
      destination: "Naperthrill", 
      date: "October 10", 
      time: "5:00 pm",
      price: "5",
      name: "Angela Luo",
      seats: 5,
      trunk: "Large",
      notes: "Line up at the start. The running speed starts slowly but gets faster each minute after you hear this signal bodeboop. A sing lap should be completed every time you hear this sound. ding Remember to run in a straight line and run as long as possible. "
  }
  }
  render () {
    return (
      
      <container> 
            <TripComponent 
            orgin = {this.state.orgin} 
            destination = {this.state.destination} 
            date = {this.state.date} 
            time = {this.state.time}
            price = {this.state.price}
            name = {this.state.name}
            trunk = {this.state.trunk}
            seats = {this.state.seats}
            notes = {this.state.notes}
            />
              
      </container>
            
      

    );
  }
}

export default App;
