import React from 'react';
import './TripFormPage.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Map, GoogleApiWrapper } from 'google-maps-react';
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '', display: 'Enter Location' };
  }

  handleChange = address => {
    this.setState({ address });
    this.setState({ display: address.description });
  };

  handleSelect = address => {
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete value={this.state.address} onChange={this.handleChange} onSelect={this.handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              style={{
                width: '20rem',
                padding: '10px',
                borderRadius: '5px',
                borderColor: '#D5D5DA',
                borderStyle: 'solid',
                borderWidth: '1px'
              }}
              {...getInputProps({
                placeholder: this.state.display,
                className: 'location-search-input'
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyChBOb8aPSbT7O9LD0XROQIyUOzeIHGsEk'
})(LocationSearchInput);
