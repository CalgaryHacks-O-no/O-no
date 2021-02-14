import React, {useEffect, useState} from "react";
import { toTitleCase } from "./utils";
import Select from 'react-select'

function RestaurantBrowse(props) {
	const { communities, currentCommunity, url, setCommRestaurants, setOrderRestaurant, setCurrentCommunity } = props;
	const [search, setSearch] = useState([]);
	const [restaurants, setRestaurants] = useState([]);
	const [searchDefault, setSearchDefault] = useState(0)

	useEffect(()=>{
		const formatted = communities.map(item => {
			const container = {};
			container['label'] = item.name;
			container['value'] = item;
			return container;
		});
		setSearch(formatted);
		setSearchDefault(formatted.find(item => item.value.id===currentCommunity.id));
		getRestaurants(currentCommunity.name);
	},[props.communities, props.currentCommunity]);

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

	const getRestaurants = (community) => {
		if (!community) {
			return;
		}

		fetch(`${url}/api/view/restaurant/${community}`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				setRestaurants(data.restaurants);
				setCommRestaurants(data.restaurants);
			});
	}

	const performSearch = (value) => {
		getRestaurants(value.value.name);
		setSearchDefault(search.find(item => item.value.id===value.value.id));
		console.log(value.value.id);
		console.log({'id':value.value.id,'name':value.value.name})
		setCurrentCommunity({'id':value.value.id,'name':value.value.name})
	};

	const setOrderDetails = (e, value) => {
		e.preventDefault();
		setOrderRestaurant(value.id);
	};

	const renderRestaurantTable = () => {
		return restaurants.slice(0,15).map((restaurant) => (
			<tr key={restaurant.id}>
				<td>{toTitleCase(restaurant.name)}</td>
				<td>{toTitleCase(restaurant.address)}</td>
				<td><button className="btn btn-primary" value={restaurant}
							onClick={(e) => {setOrderDetails(e, restaurant)}}>
					Order</button></td>
			</tr>));
	};

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
		<div id="browse" className="container-fluid mt-3">
			<div className="row">
				<div className="col-md-8">
					{/*<h2>{community}</h2>*/}
				</div>
				<div className="col">
					<Select className={"flex-column"}
							options={search}
							isSearchable={true}
							value={searchDefault}
							onChange={performSearch}
					/>

					<table className="table">
						<thead>
						<tr>
							<th scope="col">Name</th>
							<th scope="col">Address</th>
							<th scope="col">Order</th>
						</tr>
						</thead>
						<tbody>
						{renderRestaurantTable()}
						</tbody>
					</table>

					<nav aria-label="Page navigation example">
						<ul className="pagination">
							<li className="page-item"><button className="page-link">Previous</button></li>
							<li className="page-item"><button className="page-link">Next</button></li>
						</ul>
					</nav>
					<div className="d-flex m-0 p-0 justify-content-right">

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
