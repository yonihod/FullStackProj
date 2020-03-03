import React, {Component} from 'react'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';
import "./Map.css";
import AddressesService from "../../../services/Addresses";

class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'name',
            lat: 'lat',
            lng: 'lng'
        };

        AddressesService.getAddress(props.id).then(data => {
            console.log(data);
            this.setState(
                {
                    name: data.name,
                    lat: data.lat,
                    lng: data.lng
                })
        }).catch(err => {
            console.log(err);
        });

        this.state = {
            stores: [{latitude: this.state.lat, longitude: this.state.lng}]

        }
    }


    displayMarkers = () => {
        return this.state.stores.map((props, index) => {
            return <Marker key={index} id={index} position={{
                lat: props.latitude,
                lng: props.longitude
            }}
                           onClick={() => console.log("You clicked me!")}/>
        })
    };

    render(){
        return (
            <Map className="MapStyle"
                 google={this.props.google}
                 zoom={8}
                 initialCenter={{lat: this.state.latitude, lng: this.state.longitude}}
            >
                {this.displayMarkers()}
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyANXoJgfGOa7RzybrEblW5oi9Tcze7MVnU'
})(MapContainer);

