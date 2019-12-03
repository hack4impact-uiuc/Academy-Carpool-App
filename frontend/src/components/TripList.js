import React from 'react';
import TripComponent from './TripComponent.js';

class TripList extends React.Component {
  render() {
    if (!this.props.details) {
      return null;
    }
    return (
      <div>
        <b style={{ textAlign: 'center' }}>Active Trips</b>
        {this.props.trips.map(value => {
          return <TripComponent details={value} />;
        })}
      </div>
    );
  }
}
export default TripList;
