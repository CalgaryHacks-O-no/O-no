import React, { useState } from "react";
import PurchaseDetails from "./PurchaseDetails";
import PurchasePaymentForm from "./PurchasePaymentForm";
import PointsBreakdown from "./PointsBreakdown";
import CSRFToken from "./CSRFToken";

function PurchaseScreen(props) {
	const { url, currentCommunity, orderRestaurant } = props;

	// const []

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(`${name}`);

		fetch(url + "/api/create/purchase", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"X-CSRFToken": event.target.csrfmiddlewaretoken.value,
			},
			body: JSON.stringify({
				content: {
					restaurant_id: orderRestaurant,
					community_id: currentCommunity.id,
					point_amount: 264,
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
