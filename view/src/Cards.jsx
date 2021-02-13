import React from "react";

function Cards(props) {
	const rewardsData = [
		{
			title: "$10 at bobs",
		},
		{
			title: "$20 at Joes",
		},
	];

	const renderCards = (cardData) => {
		return cardData.map((card) => (
			<div className="card m-3">
				<div className="card-body">
					<h5 className="card-title text-dark">{card.title}</h5>
				</div>
			</div>
		));
	};

	return (
		<div className="container justify-content-center">
			<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
				{renderCards(rewardsData)}
			</div>
		</div>
	);
}

export default Cards;
