import React from "react";
import ReactDOM from "react-dom";
import "regenerator-runtime/runtime.js"; // Global import for async/await keywords TODO: This doesn't look needed for view-side, make this only on edit-side. See issue #183

ReactDOM.render(
	<React.StrictMode>
		<h1>Hello World</h1>
	</React.StrictMode>,
	document.getElementById("root")
);
