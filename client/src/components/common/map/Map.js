import React, { Component } from 'react'
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';


import "./Map.css";
import AddressesService from "../../../services/Addresses";

class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: [],
            activeMarker: {},
            selectedPlace: {},
            showingInfoWindow: false
        };
    }

    onMarkerClick = (props, marker) =>
        this.setState({
        activeMarker: marker,
        selectedPlace: props,
        showingInfoWindow: true
    });

    onInfoWindowClose = () =>
        this.setState({
        activeMarker: null,
        showingInfoWindow: false
    });

    onMapClicked = () => {
        if (this.state.showingInfoWindow)
            this.setState({
                activeMarker: null,
                showingInfoWindow: false
            });
    };

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
                    return (
                            <Marker
                                name = {this.state.addresses[index].name}
                                key={index}
                                id={"marker"+index}
                                position={{lat: this.state.addresses[index].lat, lng: this.state.addresses[index].lng}}
                                onClick={this.onMarkerClick}
                            />
                    )
                }
            })
        }
    };
    displayInfoWindows = () => {
        if (this.state.addresses) {
            return this.state.addresses.map((data, index) => {
                if (data !== undefined) {
                    return (
                        <InfoWindow key={index}
                                    marker={this.state.activeMarker}
                                    onClose={this.onInfoWindowClose}
                                    visible={this.state.showingInfoWindow}
                        >
                            <div>
                                <h7>{this.state.selectedPlace.name}</h7>
                            </div>
                        </InfoWindow>
                    )
                }
            })
        }
    };

    render() {
        if (!this.props.loaded) return <div>Loading...</div>;
        return (
            <div className={"map-container"}>
                <Map className="MapStyle"
                     google={this.props.google}
                     zoom={8}
                     onClick = {this.onMapClicked}
                     initialCenter={{ lat: 31.970004, lng: 34.770976 }}>
                    {this.displayMarkers()}
                    {this.displayInfoWindows()}
                </Map>
            </div>

        );
    }
}
export default GoogleApiWrapper({
    apiKey: 'AIzaSyANXoJgfGOa7RzybrEblW5oi9Tcze7MVnU'
})(MapContainer);