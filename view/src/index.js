import React from "react";
import ReactDOM from "react-dom";
import PurchaseScreen from "./PurchaseScreen";
import Cards from "./Cards";
import "regenerator-runtime/runtime.js"; // Global import for async/await keywords
import Footer from "./Footer";
import MapLeaderboardScreen from "./MapLeaderboardScreen";
import Navbar from "./Navbar";

let host;
if (window.location.hostname === "127.0.0.1") {
    host = "http://" + window.location.hostname + ":8000";
}
else{
    host = "http://" + window.location.hostname;
}

ReactDOM.render(
	<React.StrictMode>
		<Navbar />
		<MapLeaderboardScreen />
		<PurchaseScreen url = {host}/>
		<Cards />
		<Footer />
	</React.StrictMode>,
	document.getElementById("root")
);
