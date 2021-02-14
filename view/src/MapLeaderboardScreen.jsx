import React from "react";
import MapContainer from "./Maps";
import Leaderboards from "./Leaderboards";

function MapLeaderboardScreen(props) {
	return (
		<div className="container-fluid mb-5">
			<div className="row">
				<div className="col-lg-7">
					<MapContainer />
				</div>
				<div className="col-lg-3">
					<div className="pl-4">
						<Leaderboards />
					</div>
				</div>
			</div>
		</div>
	);
}

export default MapLeaderboardScreen;
