import React from "react";
import { toTitleCase } from "./utils";

function RestaurantBrowse(props) {
	const community = "CROWFOOT";

	const rewardsData = [
		{
			id: "094a471f-eda8-41c9-bb69-d05446cb7556",
			image:
				"https://www.emmys.com/sites/default/files/styles/show_detail/public/2013/09/bobs-burgers-600x600.jpg?itok=4j1yUxo5",
			name: "Bobs Burgers",
			address: "2764 Glenmore Trail, Calgary, AB T2C 2E6",
			community: "CROWFOOT",
		},
	];

	const renderCards = (cardData) => {
		return cardData.map((card, index) => (
			<div className="card m-3 summary-active" key={index}>
				<div className="card-body">
					{card.image && (
						<img
							src={card.image}
							width="300"
							height="300"
							className="rounded mx-auto d-block"
						/>
					)}
					<h5 className="card-title text-dark mt-4 font-weight-bold">
						{toTitleCase(card.name)}
					</h5>
					<h6 className="card-title text-dark mt-1 small font-weight-bold">
						{card.address}
					</h6>
				</div>
				<div className="card-footer">
					Points required: <b>{toTitleCase(card.community)}</b>
				</div>
			</div>
		));
	};

	return (
		<div id="browse" className="container mt-3">
			<div className="row">
				<div className="col-md-8">
					<h2>{community}</h2>
				</div>
				<div className="col">
					<div className="d-flex m-0 p-0 justify-content-right">
						<div className="input-group mb-3">
							<input
								type="text"
								className="form-control"
								placeholder="Search by community"
								aria-label="Search by community"
							/>
							<div className="input-group-append">
								<button
									className="btn btn-primary"
									type="button"
								>
									Search
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="justify-content-center">
				<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
					{renderCards(rewardsData)}
				</div>
			</div>
		</div>
	);
}

export default RestaurantBrowse;
