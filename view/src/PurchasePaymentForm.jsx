import React from "react";

function PurchasePaymentForm(props) {
	const onSubmit = () => {
		console.log("!!! submitted");
	};

	const basicField = (id, desc, type = "text") => (
		<div className="form-group row">
			<label htmlFor={id} className="col-sm-3 col-form-label">
				{desc}
			</label>
			<div className="col">
				<input
					type={type}
					className="form-control"
					id={id}
					aria-describedby={desc}
				/>
			</div>
		</div>
	);

	return (
		<div className="container">
			<form onSubmit={onSubmit}>
				{basicField("name", "Name")}
				{basicField("email", "Email", "email")}
				<div className="form-group row">
					<label htmlFor="name" className="col-sm-3 col-form-label">
						Tip amount
					</label>
					<div className="col">
						<div
							className="btn-group btn-group-toggle"
							data-toggle="buttons"
						>
							<label className="btn btn-light active">
								<input
									type="radio"
									name="options"
									id="option1"
								/>
								10%
							</label>
							<label className="btn btn-light">
								<input
									type="radio"
									name="options"
									id="option2"
								/>
								15%
							</label>
							<label className="btn btn-light">
								<input
									type="radio"
									name="options"
									id="option3"
								/>
								20%
							</label>
						</div>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="varTip" className="col-sm-3 col-form-label">
						Or choose your own tip
					</label>
					<div className="col">
						<div className="input-group">
							<input
								type="text"
								className="form-control"
								placeholder="Tip amount"
								id="varTip"
							/>
							<div
								className="input-group-append"
								id="varTip-dollar"
							>
								<button
									className="btn btn-outline-secondary"
									type="button"
								>
									$
								</button>
								<button
									className="btn btn-outline-secondary"
									type="button"
								>
									%
								</button>
							</div>
						</div>
					</div>
				</div>
				<small className="form-text text-muted">
					100% of all funds go to your local restaurants 😊
				</small>
				<br />
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default PurchasePaymentForm;