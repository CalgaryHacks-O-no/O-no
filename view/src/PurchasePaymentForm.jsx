import React, { useEffect, useState } from "react";
import CSRFToken from "./CSRFToken";

function PurchasePaymentForm(props) {
	const {
		onSubmit,
		priceState,
		tipState,
		tipInputState,
		tipModeState,
		curbsidePickupState,
	} = props;
	const [price, setPrice] = priceState;
	const [tip, setTip] = tipState;
	const [curbsidePickup, setCurbsidePickup] = curbsidePickupState;
	const [tipInput, setTipInput] = tipInputState;
	const [tipMode, setTipMode] = tipModeState;

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [creditCard, setCreditCard] = useState("");

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
				{basicField("creditCard", "Credit Card", setCreditCard)}
				<div class="form-check">
					<input
						class="form-check-input"
						type="checkbox"
						value=""
						id="pickupCheck"
						onChange={(e) => setCurbsidePickup(e.target.checked)}
					/>
					<label class="form-check-label" for="pickupCheck">
						Curbside pickup
					</label>
				</div>
				<small className="form-text text-muted">
					By choosing curbside pickup, you help your local restaurants
					and get a free point bonus! 😊
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
