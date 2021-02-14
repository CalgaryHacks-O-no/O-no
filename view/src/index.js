import React from "react";
import ReactDOM from "react-dom";
import PurchaseScreen from "./PurchaseScreen";
import Cards from "./Cards";
import "regenerator-runtime/runtime.js"; // Global import for async/await keywords TODO: This doesn't look needed for view-side, make this only on edit-side. See issue #183
import Footer from "./Footer";
import MapLeaderboardScreen from "./MapLeaderboardScreen";
import Navbar from "./Navbar";

ReactDOM.render(
	<React.StrictMode>
		<MapLeaderboardScreen />
		<Navbar />
		<PurchaseScreen />
		<Cards />
		<Footer />
	</React.StrictMode>,
	document.getElementById("root")
);
