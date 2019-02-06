import React, { Component } from 'react';

import './Controls.css';

class Controls extends Component {

  state = {
    userInput: {
      lat: '',
      lng: ''
    }
  }
  
  handleSubmit() {
    const location = {
      latitude: parseInt(this.state.userInput.lat),
      longitude: parseInt(this.state.userInput.lng)
    }

    if (this.validateLocation(location)) {
      this.props.addLocation(location)

      this.setState({userInput: {
        lat: '',
        lng: ''
      }})
    } else {
      alert('Latitude must be between -90 and 90, and longitude must be between -180 and 180.');
    }
  }

  validateLocation(location) {
    let valid = true;
    if (location.latitude < -90 || location.latitude > 90 || location.longitude < -180 || location.longitude > 180 || isNaN(location.latitude) || isNaN(location.longitude)) {
      valid = false;
    }

    return valid;
  }

  handleUserInput(event) {
    switch (event.target.name) {
      case 'latitude':
        this.setState({
          userInput: {
            lat: event.target.value,
            lng: this.state.userInput.lng
          }
        });
        break;
      case 'longitude':
        this.setState({
          userInput: {
            lat: this.state.userInput.lat,
            lng: event.target.value
          }
        });
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <div className='Controls'>
        <p className='control-first'></p>
        <div className='control'>
          <input 
            name='latitude' 
            type='number'
            onChange={(event) => this.handleUserInput(event)} 
            placeholder='latitude' value={this.state.userInput.lat} />
        </div>
        <div className='control'>
          <input 
          name='longitude' 
          type='number'
          onChange={(event) => this.handleUserInput(event)} 
          placeholder='longitude' value={this.state.userInput.lng} />
        </div>
        <div className='control'>
          <button onClick={() => this.handleSubmit()}>Add</button>
        </div>
      </div>
    )
  }
}

export default Controls;