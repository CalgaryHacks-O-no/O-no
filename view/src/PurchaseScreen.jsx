import React from "react";

function PurchaseScreen(props) {
	const onSubmit = () => {
		console.log("!!! submitted");
	};

	return (
		<div className="container">
			<form onSubmit={onSubmit}>
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input
						type="text"
						className="form-control"
						id="name"
						aria-describedby="name"
					/>
					<small className="form-text text-muted">
						100% of all funds go to your local restaurants 😊
					</small>
				</div>
				<button type="submit" class="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default PurchaseScreen;
