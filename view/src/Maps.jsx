import React from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import {apiKey} from "./secret";

function MapContainer(props) {

    const mapStyles = {
        width: '50%',
        height: '50%',
        left: '25%',
        top: '5%',
        
      };

      const markerColours = {
          red: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
          blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          pink: 'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
          yellow: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
          purple: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
      }

      const restaurantLocationsData = [
        {
            latitude: '51.00',
            longitude: '-114.00',
            name: 'Bobs Burgers',
            type: 'restaurant',
        },
        {
            latitude: '51.02',
            longitude: '-114.1',
            name: 'Ham Burgers',
            type: 'restaurant',
        },
    ];

    const renderLocations = (locData) => {
		return locData.map((rest) => (
            <Marker position={{ lat: rest.latitude, lng: rest.longitude}} icon= "http://maps.google.com/mapfiles/ms/icons/red-dot.png"/>
            
		));
	};


	return (
           <Map 
             google={props.google}
              zoom={12}
             style={mapStyles}
             initialCenter={{ lat: 51.0447, lng: -114.0719}}
            > 
            {renderLocations(restaurantLocationsData)}
            
            </Map>
	);
}

export default GoogleApiWrapper({
    apiKey
  })(MapContainer);