import React from "react";
import Footer from "./Footer";
import PurchaseDetails from "./PurchaseDetails";
import PurchasePaymentForm from "./PurchasePaymentForm";
import PointsBreakdown from "./PointsBreakdown";

function PurchaseScreen(props) {
	return (
		<div id="order" className="container mb-5">
			<PointsBreakdown />
			<div className="row">
				<div className="col-lg-6">
					<PurchaseDetails />
				</div>
				<div className="col-lg-6">
					<div className="pl-4">
						<PurchasePaymentForm url = {props.url}/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PurchaseScreen;
