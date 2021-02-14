import React, { useState } from "react";
import PurchaseDetails from "./PurchaseDetails";
import PurchasePaymentForm from "./PurchasePaymentForm";
import PointsBreakdown from "./PointsBreakdown";

function PurchaseScreen(props) {
	const { url } = props;

	// const []

	const onSubmit = (event) => {
		event.preventDefault();
	
		fetch(url + "/api/create/purchase", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": event.target.csrfmiddlewaretoken.value,
			},
			body: JSON.stringify({
				content: {
					restaurant_id: "006fda11bedf4b2abb8f9f3d885dc850",
					community_id: "c7c20fd26de34f02ba9e16b58a64af8f",
					point_amount: 42069,
				},
			}),
		}).then((value) => console.log(value.json()));
	
		// headers: {
		// 	'Content-Type': 'application/json',
		// 	'X-CSRFToken': e.target.csrfmiddlewaretoken.value
		// }
	};

	return (
		<div id="order" className="container mb-5">
			<PointsBreakdown />
			<div className="row">
				<div className="col-lg-6">
					<PurchaseDetails />
				</div>
				<div className="col-lg-6">
					<div className="pl-4">
						<PurchasePaymentForm
							onSubmit={onSubmit}
							url={props.url}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PurchaseScreen;
