import React, {useEffect, useState} from "react";
import { toTitleCase } from "./utils";
import Select from 'react-select'

function RestaurantBrowse(props) {
	const { communities, currentCommunity } = props;
	const [search, setSearch] = useState([]);
	const [searchDefault, setSearchDefault] = useState(0)

	useEffect(()=>{
		const formatted = communities.map(item => {
			const container = {};
			container['label'] = item.name;
			container['value'] = item;
			return container;
		});
		setSearch(formatted);
		setSearchDefault(formatted.find(item => item.value.id===currentCommunity));
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

	const performSearch = (value) => {
		console.log(value);
	}

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
							<th scope="col">Image</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<th scope="row">1</th>
							<td>Mark</td>
							<td>Otto</td>
							<td>@mdo</td>
						</tr>
						<tr>
							<th scope="row">2</th>
							<td>Jacob</td>
							<td>Thornton</td>
							<td>@fat</td>
						</tr>
						<tr>
							<th scope="row">3</th>
							<td>Larry</td>
							<td>the Bird</td>
							<td>@twitter</td>
						</tr>
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
