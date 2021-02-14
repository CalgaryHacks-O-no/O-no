import React from "react";

function PurchaseDetails(props) {
	const purchaseData = {
		items: [
			{
				name: "Pineapple pizza",
				quantity: 2,
				unitPrice: 12.0,
			},
			{
				name: "Chicken wings",
				quantity: 20,
				unitPrice: 0.75,
			},
			{
				name: "Poppers",
				quantity: 8,
				unitPrice: 1.5,
			},
			{
				name: "I want to sleep",
				quantity: 0,
				unitPrice: 10,
			},
		],
	};

	const renderRows = (rows) => rows.map(renderItem);

	const renderItem = (purchaseItem, i) => (
		<tr key={i}>
			<td>{purchaseItem.name}</td>
			<td>${purchaseItem.unitPrice.toFixed(2)}</td>
			<td>{purchaseItem.quantity}</td>
		</tr>
	);

	const beforeTaxPrice = purchaseData.items.reduce(
		(sum, item) => sum + item.unitPrice * item.quantity,
		0
	);

	return (
		<>
			<table className="table table-hover">
				<thead>
					<tr>
						<th scope="col">Item</th>
						<th scope="col">Price</th>
						<th scope="col">Quantity</th>
					</tr>
				</thead>
				<tbody>{renderRows(purchaseData.items)}</tbody>
			</table>
			<br />
			<div className="pr-4">
				<div className="row">
					<div className="col">
						<p>Total before tax</p>
					</div>
					<div className="col">
						<p className="text-right">
							${beforeTaxPrice.toFixed(2)}
						</p>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p>Tax</p>
					</div>
					<div className="col">
						<p className="text-right">
							${(beforeTaxPrice * 0.05).toFixed(2)}
						</p>
					</div>
				</div>
				<div className="row">
					<div className="col">
						<p>
							<b>Total</b>
						</p>
					</div>
					<div className="col">
						<p className="text-right">
							<b>${(beforeTaxPrice * 1.05).toFixed(2)}</b>
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default PurchaseDetails;
