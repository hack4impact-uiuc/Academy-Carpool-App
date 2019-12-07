import React from 'react';
import './TripFormPage.css';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { Input } from 'antd';
class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,

      //address: '',
      display: this.props.display,
      searchValue: ''
    };
  }

  handleChange = address => {
    this.setState({ searchValue: address });
    //this.setState({ display: address.description });
    //console.log("hello")
    //console.log(this.state.address)
  };

  handleSelect = address => {
    console.log('Expected: ' + address);
    console.log('Search Value: ' + this.state.searchValue);
    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  render() {
    return (
      <PlacesAutocomplete value={this.state.searchValue} onChange={this.handleChange} onSelect={this.handleSelect}>
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <Input
              size="large"
              {...getInputProps({
                placeholder: this.state.display,
                className: 'location-search-input',
                color: '17D82F'
              })}
            />
            {/* <input 
              // style={{
              //   width: '20rem',
              //   // paddingTop: '1px',
              //   // paddingBottom: '1px',
              //   // paddingLeft: '10px',
              //   // paddingRight: '7px',
              //   padding: '10px',
              //   borderRadius: '5px',
              //   borderColor: '#D5D5DA',
              //   borderStyle: 'solid',
              //   borderWidth: '1px'
              // }}
              {...getInputProps({
                placeholder: this.state.display,
                className: 'location-search-input',
                color: '17D82F'
                
              })}
            /> */}
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
  apiKey: 'AIzaSyDvWoyydgE3bfQCi_t65khOUnMgvkuqgPI'
})(LocationSearchInput);
