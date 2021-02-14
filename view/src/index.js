import React from "react";
import ReactDOM from "react-dom";
import PurchaseScreen from "./PurchaseScreen";
import Cards from "./Cards";
import "regenerator-runtime/runtime.js"; // Global import for async/await keywords
import Footer from "./Footer";
import MapLeaderboardScreen from "./MapLeaderboardScreen";
import Navbar from "./Navbar";

ReactDOM.render(
	<React.StrictMode>
		<Navbar />
		<MapLeaderboardScreen />
		<PurchaseScreen />
		<Cards />
		<Footer />
	</React.StrictMode>,
	document.getElementById("root")
);
