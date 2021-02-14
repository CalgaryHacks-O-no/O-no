import React from "react";
import Footer from "./Footer";
import PurchaseDetails from "./PurchaseDetails";
import PurchasePaymentForm from "./PurchasePaymentForm";
import PointsBreakdown from "./PointsBreakdown";

function PurchaseScreen(props) {
	return (
		<div className="container mb-5">
			<PointsBreakdown />
			<div className="row">
				<div className="col-lg-6">
					<PurchaseDetails />
				</div>
				<div className="col-lg-6">
					<div className="pl-4">
						<PurchasePaymentForm />
					</div>
				</div>
			</div>
		</div>
	);
}

export default PurchaseScreen;
