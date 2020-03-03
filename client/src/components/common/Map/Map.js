import React, {Component} from 'react'
import {Map, GoogleApiWrapper, Marker} from 'google-maps-react';


import "./Map.css";
import AddressesService from "../../../services/Addresses";
import PostsService from "../../../services/Posts";
import PostBox from "../../post/PostBox";

class MapContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
        addresses: []
        };
    }

   componentDidMount(): void {
        AddressesService.getAddresses().then(data => {
            console.log(data);
            this.setState(
                {addresses : data})
        }).catch(err => {
            console.log(err);
        });
    }

    displayMarkers = () => {
        if (this.props.addresses) {
            return this.state.addresses.map((data, index) => {
                if (data !== undefined) {
                    return <Marker key={index} id={index} position={{
                        lat: this.state.addresses.lat,
                        lng: this.state.addresses.lng
                    }}
                                   onClick={() => console.log(this.state.name)}/>
                }})
        }};

    render(){
        return (
            <Map className="MapStyle"
                 google={this.state.google}
                 zoom={8}
                 initialCenter={{lat: this.state.addresses.lat, lng: this.state.addresses.lng}}
            >
                {this.displayMarkers()}
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyANXoJgfGOa7RzybrEblW5oi9Tcze7MVnU'
})(MapContainer);

