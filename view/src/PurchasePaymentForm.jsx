import React, { useEffect, useState } from "react";
import CSRFToken from "./CSRFToken";

function PurchasePaymentForm(props) {
	const { onSubmit, priceState, tipState, curbsidePickupState } = props;
	const [price, setPrice] = priceState;
	const [tip, setTip] = tipState;
	const [curbsidePickup, setCurbsidePickup] = curbsidePickupState;

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	const [tipInput, setTipInput] = useState(0);
	const [tipMode, setTipMode] = useState("dollars");

	useEffect(() => {
		if (tipInput == "" || parseFloat(tipInput) <= 0) {
			setTip(0);
			return;
		}

		if (tipMode === "dollars") {
			setTip(parseFloat(tipInput));
		} else {
			setTip(parseFloat(tipInput) * 0.01 * price);
		}
	}, [tipInput, tipMode]);

	const basicField = (id, desc, hook, type = "text") => (
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
					onChange={(e) => hook(e.target.value)}
				/>
			</div>
		</div>
	);

	return (
		<div className="container">
			<form onSubmit={onSubmit}>
				<CSRFToken />
				{basicField("name", "Name", setName)}
				{basicField("email", "Email", setEmail, "email")}
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
									id="tip10Percent"
									onClick={() => setTip(price * 0.1)}
								/>
								10%
							</label>
							<label className="btn btn-light">
								<input
									type="radio"
									name="options"
									id="tip15Percent"
									onClick={() => setTip(price * 0.15)}
								/>
								15%
							</label>
							<label className="btn btn-light">
								<input
									type="radio"
									name="options"
									id="tip20Percent"
									onClick={() => setTip(price * 0.2)}
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
								type="number"
								className="form-control"
								placeholder="Tip amount"
								id="varTip"
								onChange={(e) => setTipInput(e.target.value)}
							/>
							<div
								className="input-group-append"
								id="varTip-dollar"
							>
								<button
									className="btn btn-outline-secondary"
									type="button"
									onClick={() => setTipMode("dollars")}
								>
									$
								</button>
								<button
									className="btn btn-outline-secondary"
									type="button"
									onClick={() => setTipMode("percent")}
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
