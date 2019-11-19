import Homepage from './pages/Homepage.js';
import './App.css';
import React from 'react';
class App extends React.Component {
  render() {
    return (
      <div>
        <div className="websitetitle">
          <b>Carpool4UIUC</b>
          <div className="titlesubheader">&nbsp;a Hack4Impact project</div>
          <hr />
        </div>
        <Homepage />
      </div>
    );
  }
}

export default App;
