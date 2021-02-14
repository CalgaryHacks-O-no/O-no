import React from "react";
import MapContainer from "./MapContainer";
import Leaderboards from "./Leaderboards";

function MapLeaderboardScreen(props) {
	const { communities, people, url } = props;

	return (
		<div
			id="home"
			className="container-fluid pl-0"
			style={{ height: "94.5vh" }}
		>
			<div className="row h-100">
				<div className="col-lg-7 pl-0">
					<MapContainer communities={communities} />
				</div>
				<div className="col-lg-3">
					<div className="pl-4 mt-3">
						<Leaderboards
							communities={communities}
							people={people}
							url={url}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default MapLeaderboardScreen;
