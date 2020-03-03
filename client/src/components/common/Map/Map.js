import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


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

    componentDidMount() {
        AddressesService.getAddresses().then(data => {
            this.setState({ addresses: data })
        }).catch(err => {
            console.log(err);
        });
    }

    displayMarkers = () => {
        if (this.state.addresses) {
            return this.state.addresses.map((data, index) => {
                if (data !== undefined) {
                    return <Marker key={index} id={index} position={{
                        lat: this.state.addresses[index].lat,
                        lng: this.state.addresses[index].lng
                    }}
                    onClick={() => console.log(this.state.name)} />
                }
            })
        }
    };

    render() {
        return (
            <Map className="MapStyle"
                google={this.props.google}
                zoom={8}
                initialCenter={{ lat: 31.970004, lng: 34.770976 }}>
                {this.displayMarkers()}
            </Map>
        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyANXoJgfGOa7RzybrEblW5oi9Tcze7MVnU'
})(MapContainer);

