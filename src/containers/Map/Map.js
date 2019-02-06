import React, { Component } from 'react';
import L from 'leaflet';

import './Map.css';

class Map extends Component {

    state = {
        locations: [],
        markers: []
    }

    componentDidMount() {

        this.layer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.satellite',
            accessToken: 'pk.eyJ1IjoiZjRpcmxpbmUiLCJhIjoiY2pyczNqbnYzMGI5ajQ0bWlrNWd2OGNkZiJ9.XqpA7ffYVOXmGx-2UJa8uw'
        });

        this.myMap = L.map('map', {
            center: [35, 0],
            zoom: 2,
            layers: [
                this.layer,
            ]
        });

        this.myMap.on('click', this.addMarker.bind(this));
    }

    addMarker(e) {
        const marker = L.marker(e.latlng);
        marker.addTo(this.myMap);

        const newLocation = {
            latitude: e.latlng.lat,
            longitude: e.latlng.lng
        }
        
        this.props.addMarker(newLocation);
    }

    componentDidUpdate() {
        if (this.state.locations !== this.props.locations) {
            this.setState({locations: this.props.locations}, () => {
                this.addMarkers();
            });
        } else {
            return false;
        }
    }

    addMarkers() {
        for (let i = 1; i < this.state.locations.length; i++) {
            const marker = L.marker([this.state.locations[i].latitude, this.state.locations[i].longitude]);
            marker.addTo(this.myMap);
        }

        this.myMap.eachLayer((layer) => {
            if (layer._latlng) {
                let noMatch = true;

                for (let i = 1; i < this.state.locations.length; i++) {
                    const layerLat = layer._latlng.lat;
                    const layerLng = layer._latlng.lng;

                    if (layerLat === this.state.locations[i].latitude && layerLng === this.state.locations[i].longitude) {
                        noMatch = false;
                    }
                }

                if (noMatch) {
                    this.myMap.removeLayer(layer);
                }
            }
        })
    }

    render() {
        return (
            <div id='map'></div>
        )
    }
}

export default Map;