import React from "react";
import MapContainer from "./Maps";
import Leaderboards from "./Leaderboards";

function MapLeaderboardScreen(props) {
	return (
		<div
			id="home"
			className="container-fluid pl-0"
			style={{ height: "94.5vh" }}
		>
			<div className="row h-100">
				<div className="col-lg-7 pl-0">
					<MapContainer />
				</div>
				<div className="col-lg-3">
					<div className="pl-4 mt-3">
						<Leaderboards url={props.url}/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MapLeaderboardScreen;
