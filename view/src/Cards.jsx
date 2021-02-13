import React from "react";

function Cards(props) {
	const rewardsData = [
		{
			image: "https://www.emmys.com/sites/default/files/styles/show_detail/public/2013/09/bobs-burgers-600x600.jpg?itok=4j1yUxo5",
			title: "Bobs Burgers",
			location: "Unknown",
			description: "Buy 3 burgers, get one for free!",
		},
		{
			image: "https://pbs.twimg.com/profile_images/583341560672079872/66UMbr7j_400x400.jpg",
			title: "Vintage Chophouse and Tavern",
			location: "320 11 Ave SW, Calgary, AB T2R 0C5",
			description: "Spend over $100, get $20 off the purchase.",
		},
		{
			image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP377Va6oq1ROvnIM9fsp3SKPZnGZBdR3xoQ&usqp=CAU",
			title: "Wow Chicken",
			location: "324 10 St NW, Calgary, AB T2N 1V8",
			description: "Get $20 off of your next purchase!",
		},
		{
			image: "https://pbs.twimg.com/profile_images/1048249332124667904/COq35T3Y_400x400.jpg",
			title: "The Den and Black Lounge",
			location: "500 University Dr NW, Calgary, AB T2N 1N4",
			description: "2 Free pitchers of Den Lager.",
		},
		
	];

	const renderCards = (cardData) => {
		return cardData.map((card) => (
			<div className="card m-3 summary-active">
				<div className="card-body">
					<img src={card.image} width="300" height="300" class="rounded mx-auto d-block"></img>
					<h5 className="card-title text-dark mt-4" class="font-weight-bold" >{card.title}</h5>
					<h6 className="card-title text-dark mt-1 small" class="font-weight-bold">{card.location}</h6>
					<h6 className="card-description text-dark mt-2 small" class="font-weight-light">{card.description}</h6>
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
