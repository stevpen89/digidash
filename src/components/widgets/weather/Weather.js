import React, { Component } from 'react';
import axios from 'axios'
import './Weather.css'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Skycons from 'react-skycons'

export default class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      weather: [],
      toggle: false,
      day: {}
    };
  }

  //changes the location?
  handleChange = address => { this.setState({ address }) };

  handleSelect = address => {
    geocodeByAddress(address).then(results => getLatLng(results[0])).then(latLng => {
      let lat = latLng.lat
      let lng = latLng.lng
      axios.post('/api/weather', { lat, lng }).then(res => {
        console.log(res.data)
        this.setState({ weather: res.data.daily.data });
      })
    })
  };

  dayoftheweek(val) {
    let str = ""
    if (val === 0) { str = "Sunday" }
    else if (val === 1) { str = "Monday" }
    else if (val === 2) { str = "Tuesday" }
    else if (val === 3) { str = "Wedsday" }
    else if (val === 4) { str = "Thursday" }
    else if (val === 5) { str = "Friday" }
    else if (val === 6) { str = "Saturday" }
    else if (val === 6) { str = "Saturday" }
    return str;
  }

  weather() {
    let display = []
    const { weather } = this.state
    let day = new Date()
    for (let i = 0; i < weather.length; i++) {
      let iconz = weather[i].icon.toUpperCase();
      iconz = iconz.replace(/-/g, '_');
      console.log(iconz)
      let current = this.dayoftheweek(day.getDay())
      display.push(
        <div className='card' onClick={() => this.setDay(i, current, iconz)}>
          <p>{current}</p>
          <div >
            <Skycons
              color='white'
              icon={iconz}
              autoplay={true}
            />
          </div>
          <p>{weather[i].apparentTemperatureHigh}°F</p>
          <p>{weather[i].apparentTemperatureLow}°F</p>
          {/* <p>{weather[i].summary}</p> */}
        </div>)
      day.setDate(day.getDate() + 1);
    }
    return display
  }

  setDay(i, day, iconz) {
    let obj = { ind: i, day: day, icon: iconz }
    this.setState({ day: obj, toggle: true })
  }

  unset() { this.setState({ toggle: false }) }

  //detailed view
  deatailed() {
    const { day, weather } = this.state
    let ind = day.ind;
    return (<div>
      <div>
        <button className="back-button" onClick={() => this.unset()}><i class="fas fa-caret-left"></i></button>
        <p>{day.day}</p>
        <div ><Skycons color='white' icon={day.icon} autoplay={true} /></div>
        <p>High: {weather[ind].apparentTemperatureHigh}°F</p>
        <p>Low: {weather[ind].apparentTemperatureLow}°F</p>
        <p>{weather[ind].summary}</p>
        <p>humidity:{weather[ind].humidity}</p>
        <p>precipitation:{weather[ind].precipType}</p>
        <p>probablility{weather[ind].precipProbability}</p>
        <p>windSpeed:{weather[ind].windSpeed}</p>
        <p>windGust:{weather[ind].windGust}</p>
        <p>visibility:{weather[ind].visibility}</p>
      </div>
    </div>)
  }

  render() {
    return (
      <div className="standard-widget weather">

        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >

          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input {...getInputProps({ placeholder: 'Search Places ...', className: 'location-search-input', })} />

              <div className="autocomplete-dropdown-container">
                {/* loading text */}
                {loading && <div>Loading...</div>}

                {/* location suggestions box */}
                {suggestions.map(suggestion => {
                  const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';

                  // inline style for demonstration purpose
                  const style = suggestion.active ? { backgroundColor: '#fafafa', color: 'black', cursor: 'pointer' } : { backgroundColor: 'white', color: 'black', cursor: 'pointer' };
                  return (
                    <div {...getSuggestionItemProps(suggestion, { className, style })}>
                      <span>{suggestion.description}</span>
                    </div>
                  );
                })}

              </div>

            </div>
          )}
        </PlacesAutocomplete>

        <div className='view'>
          {this.state.day.ind >= 0 && this.state.toggle === true ? this.deatailed() : this.weather()}
        </div>
      </div>
    );
  }
}