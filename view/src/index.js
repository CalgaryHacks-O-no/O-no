import React from "react";
import ReactDOM from "react-dom";
import PurchaseScreen from "./PurchaseScreen";
import Cards from "./Cards";
import "regenerator-runtime/runtime.js"; // Global import for async/await keywords
import Footer from "./Footer";
import MapLeaderboardScreen from "./MapLeaderboardScreen";
import Navbar from "./Navbar";
import RestaurantBrowse from "./RestaurantBrowse";

let host;
if (window.location.hostname === "127.0.0.1") {
    host = "http://" + window.location.hostname + ":8000";
}
else if (window.location.hostname === "localhost") {
    host = "http://" + window.location.hostname + ":8000";
}
else{
    host = "http://" + window.location.hostname;
}

ReactDOM.render(
	<React.StrictMode>
		<Navbar />
		<MapLeaderboardScreen url={host}/>
		<RestaurantBrowse />
		<PurchaseScreen url={host}/>
		<Cards />
		<Footer />
	</React.StrictMode>,
	document.getElementById("root")
);
