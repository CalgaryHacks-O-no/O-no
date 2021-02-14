import React, { useState, useEffect } from "react";
import { toTitleCase } from "./utils";

function Leaderboards(props) {
	const [communities, setCommunities] = useState([]);
	const [people, setPeople] = useState([]);

	const userPointData = [
		{
			username: "Hobbit",
			lastName: "Ton",
			points: 233,
		},
		{
			username: "Wilburt",
			lastName: "Wilfree",
			points: 589,
		},
		{
			username: "Richman",
			lastName: "Yard",
			points: 10023,
		},
		{
			username: "Ronald",
			lastName: "Weasley",
			points: 432,
		},
		{
			username: "Wall",
			lastName: "E",
			points: 153,
		},
		{
			username: "Erik",
			lastName: "Wallstreet",
			points: 865,
		},
		{
			username: "Mlon",
			lastName: "Eusk",
			points: 983,
		},
		{
			username: "Bill",
			lastName: "Jobs",
			points: 642,
		},
		{
			username: "Queue",
			lastName: "Meet",
			points: 213,
		},
		{
			username: "Uni",
			lastName: "Student",
			points: 123,
		},
		{
			username: "Happy",
			lastName: "Sadmore",
			points: 236,
		},
		{
			username: "Alex",
			lastName: "A",
			points: 513,
		},
	];

	useEffect(() => {
		getCommunities();
		getPeople();
	}, []);

	const sortedUserData = userPointData.sort((a, b) => b.points - a.points);

	const getCommunities = () => {
		fetch(props.url + "/api/view/community", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				setCommunities(data.community);
			})
			.then((res) => res.json())
			.then((data) => {
				setCommunities(data.community);
			});
	};

	const getPeople = () => {
		fetch(props.url + "/api/view/customer", {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				setPeople(data.customer);
			})
			.then((res) => res.json())
			.then((data) => {
				setPeople(data.customer);
			});
	};

	const addRows = (boiz) => {
		return boiz.slice(0, 5).map((person, i) => (
			<tr key={i}>
				<td>{person.username}</td>
				<td>{person.points}</td>
			</tr>
		));
	};

	const addCommunityRows = (communities) => {
		return communities.slice(0, 7).map((community) => (
			<tr key={community.id}>
				<td>{toTitleCase(community.name)}</td>
				<td>{toTitleCase(community.sector)}</td>
				<td>{community.points}</td>
			</tr>
		));
	};

	return (
		<div className="container">
			<h3 className="text-center">Leaderboards</h3>
			<table className="table">
				<thead>
					<tr>
						<th scope="col">Community</th>
						<th scope="col">Sector</th>
						<th scope="col">Points</th>
					</tr>
				</thead>
				<tbody>
					{addCommunityRows(
						communities.sort((a, b) => b.points - a.points)
					)}
				</tbody>
			</table>

			<table className="table">
				<thead>
					<tr>
						<th scope="col">Name</th>
						<th scope="col">Points</th>
					</tr>
				</thead>
				<tbody>
					{addRows(sortedUserData)}
					{addRows(people.sort((a, b) => b.points - a.points))}
				</tbody>
			</table>
		</div>
	);
}

export default Leaderboards;
