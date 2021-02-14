import React, { useEffect, useState, useRef } from "react";
import {
	Map,
	GoogleApiWrapper,
	InfoWindow,
	Marker,
	Polygon,
} from "google-maps-react";
import { apiKey } from "./secret";
import Spinner from "./Spinner";
import containsLocation from "./containsLocation";

function MapContainer(props) {
	const { communities, setCurrentCommunity } = props;

	const [geolocationLoaded, setGeolocationLoaded] = useState(false);
	const [userLongitude, setUserLongitude] = useState(null); // Default should be: -114.071
	const [userLatitude, setUserLatitude] = useState(null); // Default should be: 51.0447

	useEffect(() => {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				setUserLatitude(position.coords.latitude);
				setUserLongitude(position.coords.longitude);
				setGeolocationLoaded(true);
			});
		} else {
			setUserLatitude(51.0447);
			setUserLongitude(-114.071);
			setGeolocationLoaded(true);
		}
		findCurrentCommunity();
	}, [props.communities]);

	const mapStyles = {
		width: "100%",
		height: "100%",
	};

	const markerColours = {
		red: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
		blue: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
		pink: "http://maps.google.com/mapfiles/ms/icons/pink-dot.png",
		yellow: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
		purple: "http://maps.google.com/mapfiles/ms/icons/purple-dot.png",
	};

	let restaurantLocationsData = [
		{
			latitude: "51.00",
			longitude: "-114.00",
			name: "Bobs Burgers",
			type: "restaurant",
		},
		{
			latitude: "51.02",
			longitude: "-114.1",
			name: "Ham Burgers",
			type: "restaurant",
		},
	];
	// Debug: Show the community the user is in
	// if (geolocationLoaded) {
	// 	restaurantLocationsData.push({
	// 		latitude: userLatitude.toString(),
	// 		longitude: userLongitude.toString(),
	// 		name: "User Location",
	// 		type: "user",
	// 	});
	// }

	const renderLocations = (locData) => {
		return locData.map((rest, i) => (
			<Marker
				key={i}
				position={{ lat: rest.latitude, lng: rest.longitude }}
				icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
			/>
		));
	};

	const findCurrentCommunity = () => {
		if (!communities || !communities.length) {
			return;
		}
		let currCommunity = {}
		const currLoc = new window.google.maps.LatLng(userLatitude, userLongitude);
		for (let community of communities){
			const shape = new window.google.maps.Polygon({paths: community.location});
			if (containsLocation(currLoc, shape)){
				currCommunity = community;
				break;
			}
		}
		console.log(currCommunity);
		setCurrentCommunity(currCommunity.id);
	};

	const renderPolygons = () => {
		if (!communities || !communities.length) {
			return;
		}

		const sortedCommunities = communities.sort(
			(a, b) => b.points - a.points
		);
		const topCommunities = sortedCommunities;
		const maxPoints = topCommunities[0].points;
		const minPoints = topCommunities[topCommunities.length - 1].points;
		const pointRange = maxPoints - minPoints;

		return topCommunities.map((community) => (
			<Polygon
				key={community.id}
				paths={community.location}
				strokeColor="#00FF00"
				strokeOpacity={0.8}
				strokeWeight={2}
				fillColor="#00FF00"
				fillOpacity={
					((community.points - minPoints) / pointRange) * 0.4
				}
			/>
		));
	};

	if (!geolocationLoaded) {
		return <Spinner />;
	}

	return (
		<div className="container h-100">
			<Map
				google={props.google}
				zoom={13}
				style={mapStyles}
				// initialCenter={{ lat: 51.0447, lng: -114.0719 }}
				initialCenter={{ lat: userLatitude, lng: userLongitude }}
			>
				{renderLocations(restaurantLocationsData)}
				{renderPolygons()}
			</Map>
		</div>
	);
}

export default GoogleApiWrapper({
	apiKey,
})(MapContainer);
