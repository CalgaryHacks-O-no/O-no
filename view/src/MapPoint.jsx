import React, { useEffect, useState, useRef } from "react";
import {InfoWindow, Marker} from "google-maps-react";
import { toTitleCase } from "./utils";

function MapPoints(props) {
	const {key, latitude, longitude, name, address} = props;
	const [infoVisible, setInfoVisible] = useState(false);

	const markerClick = (props, marker, e) => {
		setInfoVisible(!infoVisible);
	};

	console.log(latitude, longitude);

	return (
			<InfoWindow
				visible={infoVisible}
			>
				<div>
					<p>{toTitleCase(name)}</p>
					<br/>
					<p>{toTitleCase(address)}</p>
				</div>
			</InfoWindow>
	);

}export default MapPoints;