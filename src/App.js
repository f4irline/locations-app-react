import React, { Component } from 'react';
import DeleteButton from './components/Controls/DeleteButton'
import Table from './containers/Table/Table';
import Map from './containers/Map/Map';

import './App.css';

class App extends Component {

  state = {
    locations: [      
      {
        id: '#',
        latitude: 'latitude',
        longitude: 'longitude',
        del: 'Delete'
      },
    ],
    endpoint: 'http://localhost:8080/api/locations/'
  }

  componentDidMount() {
    this.getLocations();
  }

  postLocation(location) {
    return fetch(this.state.endpoint, {
      method: 'POST',
      headers: {
        // Database accepts content of application/json type, therefore define it
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(location), // Data type must match "Content-Type" header
    }).then(response => response.json())
    .then(location => this.addLocation(location)); // Parse response to JSON
  }

  getLocations() {
    fetch(this.state.endpoint)
      .then(httpResponse => httpResponse.json())
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          this.addLocation(data[i]);
        }
      })
      .catch(error => console.log(error));
  }

  addLocation(location) {
    const newLocation = {
      id: location.id,
      latitude: location.latitude,
      longitude: location.longitude,
      btn: <DeleteButton deleteLocation={this.deleteLocation.bind(this)} id={location.id}/>
    }

    const newArray = [...this.state.locations, newLocation];

    // const sortedLocations = newArray.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? - 1 : 0)); No sorting needed :(

    this.setState({locations: newArray});
  }

  deleteLocation(locationId) {
    const locations = this.state.locations;
    let newLocations = [];
    locations.forEach((location) => {
      if (locationId !== location.id) {
        newLocations.push(location);
      }
    })

    this.setState({locations: newLocations});
    this.deleteFromDatabase(locationId);
  }

  deleteFromDatabase(locationId) {
    return fetch(this.state.endpoint  + locationId, {
      method: 'DELETE',
      header: {
        'content-type': 'application/json'
      }
    }).then(console.log('Removed location'))
      .catch(error => console.log(error));
  }

  render() {
    return (
      <div className='App'>
        <h1 className='header'>Location App</h1>
        <div className='map-wrapper'>
          <Map addMarker={this.postLocation.bind(this)} locations={this.state.locations} />
        </div>
        <Table addLocation={this.postLocation.bind(this)} locations={this.state.locations} />
      </div>
    );
  }
}

export default App;
