import React from "react";
import ReactDOM from "react-dom";
import PurchaseScreen from "./PurchaseScreen";
import Cards from "./Cards";
import "regenerator-runtime/runtime.js"; // Global import for async/await keywords TODO: This doesn't look needed for view-side, make this only on edit-side. See issue #183

ReactDOM.render(
	<React.StrictMode>
		<Cards />
		<PurchaseScreen />
	</React.StrictMode>,
	document.getElementById("root")
);
