import React from "react";

function Spinner(props) {
	const {
		color = "text-secondary", // Any Bootstrap color, prefixed with the word "text-". Example: text-info, text-primary
		margin = "m-3", // Any Bootstrap margin
		size = "", // Options: "", "spinner-border-sm"
		style = {},
	} = props;

	return (
		<div
			className={["spinner-border", color, margin, size]
				.filter((str) => str)
				.join(" ")}
			style={style}
			role="status"
		>
			<span className="sr-only">Loading...</span>
		</div>
	);
}

export default Spinner;
