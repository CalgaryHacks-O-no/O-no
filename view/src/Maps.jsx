import React from "react";
import { Map, GoogleApiWrapper } from 'google-maps-react';
import {apiKey} from "./secret";

function MapContainer(props) {

    const mapStyles = {
        width: '50vw',
        height: '50vh',
        left: '25%',
        top: '5%',
        
      };
	return (
        <Map 
          google={props.google}
          zoom={12}
          style={mapStyles}
          initialCenter={{ lat: 51.0447, lng: -114.0719}}
        />

	);
}

export default GoogleApiWrapper({
    apiKey
  })(MapContainer);