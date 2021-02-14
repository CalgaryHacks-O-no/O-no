import React, { useState, useEffect } from "react";
import PurchaseDetails from "./PurchaseDetails";
import PurchasePaymentForm from "./PurchasePaymentForm";
import PointsBreakdown from "./PointsBreakdown";
import CSRFToken from "./CSRFToken";

function PurchaseScreen(props) {
	const { url, currentCommunity, orderRestaurant } = props;

	const [price, setPrice] = useState(51);
	const [tip, setTip] = useState(0);
	const [curbsidePickup, setCurbsidePickup] = useState(false);
	const [tipInput, setTipInput] = useState("");
	const [tipMode, setTipMode] = useState("dollars");

	const [totalPoints, setTotalPoints] = useState(155);

	useEffect(() => {
		console.log("curbside: ", curbsidePickup);
	}, [curbsidePickup]);

	useEffect(() => {
		calculateTip();
		// calcPoints();
	}, [tipInput, tipMode]);

	const calculateTip = () => {
		if (tipInput == "" || parseFloat(tipInput) <= 0) {
			setTip(0);
			return;
		}

		if (tipMode === "dollars") {
			setTip(parseFloat(tipInput));
		} else {
			setTip(parseFloat(tipInput) * 0.01 * price);
		}
	};

	const calcPoints = () => {
		const priceBeforeTax = Math.ceil(price);
		const tipMultiplied = parseFloat(Math.ceil(tip)) * 2;
		const visitMultiplier = 3;
		const curbsideBonus = curbsidePickup ? 15 : 0;

		const totalPoints =
			(priceBeforeTax + tipMultiplied + curbsideBonus) * visitMultiplier;
		const priceProp = (priceBeforeTax / totalPoints) * 0.9;
		const tipProp = tipMultiplied / totalPoints;
		const curbsideProp = curbsideBonus / totalPoints;
		const visitProp = (priceProp + tipProp) * (visitMultiplier - 0.9);

		return setTotalPoints(totalPoints);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(`${name}`);

		console.log("total points", totalPoints);

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
					point_amount: totalPoints,
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
			<PointsBreakdown
				price={price}
				tip={tip}
				curbsidePickup={curbsidePickup}
				totalPoints={totalPoints}
				setTotalPoints={setTotalPoints}
			/>
			<div className="row">
				<div className="col-lg-6">
					<PurchaseDetails price={price} tip={tip} />
				</div>
				<div className="col-lg-6">
					<div className="pl-4">
						<PurchasePaymentForm
							onSubmit={onSubmit}
							priceState={[price, setPrice]}
							tipState={[tip, setTip]}
							tipInputState={[tipInput, setTipInput]}
							tipModeState={[tipMode, setTipMode]}
							curbsidePickupState={[
								curbsidePickup,
								setCurbsidePickup,
							]}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PurchaseScreen;
