import React, {Component} from 'react'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import "./Map.css";

class MapContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stores: [{latitude: 31.970004, longitude: 34.770976}]
        }
    }

    displayMarkers = () => {
        return this.state.stores.map((store, index) => {
            return <Marker key={index} id={index} position={{
                lat: store.latitude,
                lng: store.longitude
            }}
                           onClick={() => console.log("You clicked me!")}/>
        })
    };

    render() {
        return (
            <Map className="MapStyle"
                google={this.props.google}
                zoom={8}
                style={Map.css}
                initialCenter={{lat: 47.444, lng: -122.176}}
            >
                {this.displayMarkers()}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyANXoJgfGOa7RzybrEblW5oi9Tcze7MVnU'
})(MapContainer);