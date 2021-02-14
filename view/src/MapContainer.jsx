import React, { useEffect, useState } from "react";
import {
	Map,
	GoogleApiWrapper,
	InfoWindow,
	Marker,
	Polygon,
} from "google-maps-react";
import { apiKey } from "./secret";

function MapContainer(props) {
	const { communities } = props;

	const [userLongitude, setUserLongitude] = useState(51.05011);
	const [userLatitude, setUserLatitude] = useState(-114.08529);

	useEffect(() => {
		if ("geolocation" in navigator) {
			console.log("Available");
			navigator.geolocation.getCurrentPosition(function (position) {
				console.log("Latitude is :", position.coords.latitude);
				console.log("Longitude is :", position.coords.longitude);
				setUserLatitude(position.coords.latitude);
				setUserLongitude(position.coords.longitude);
			});
		} else {
			console.log("Not Available");
		}
	}, []);

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

	const restaurantLocationsData = [
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
		{
			latitude: userLatitude.toString(),
			longitude: userLongitude.toString(),
			name: "User Location",
			type: "user",
		},
	];

	const renderLocations = (locData) => {
		return locData.map((rest, i) => (
			<Marker
				key={i}
				position={{ lat: rest.latitude, lng: rest.longitude }}
				icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
			/>
		));
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

	return (
		<div className="container h-100">
			<Map
				google={props.google}
				zoom={12}
				style={mapStyles}
				initialCenter={{ lat: 51.0447, lng: -114.0719 }}
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
