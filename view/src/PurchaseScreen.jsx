import React from "react";

function PurchaseScreen(props) {
	const onSubmit = () => {
		console.log("!!! submitted");
	};

	return (
		<div className="container">
			<form onSubmit={onSubmit}>
				<div className="form-group row">
					<label htmlFor="name" className="col-sm-3 col-form-label">
						Name
					</label>
					<div className="col">
						<input
							type="text"
							className="form-control"
							id="name"
							aria-describedby="name"
						/>
					</div>
				</div>
				<div className="form-group row">
					<label htmlFor="name" className="col-sm-3 col-form-label">
						Email
					</label>
					<div className="col">
						<input
							type="email"
							className="form-control"
							id="name"
							aria-describedby="email"
						/>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="name" className="mr-3">
						Tip amount
					</label>
					<div
						className="btn-group btn-group-toggle"
						data-toggle="buttons"
					>
						<label className="btn btn-light active">
							<input type="radio" name="options" id="option1" />
							10%
						</label>
						<label className="btn btn-light">
							<input type="radio" name="options" id="option2" />
							15%
						</label>
						<label className="btn btn-light">
							<input type="radio" name="options" id="option3" />
							20%
						</label>
					</div>
					<div className="form-group row">
						<div className="col-sm-3">
							<label
								htmlFor="varTip"
								className="mr-3 col-form-label"
							>
								Or choose your own tip
							</label>
						</div>
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
				</div>

				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}

export default PurchaseScreen;
