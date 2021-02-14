import React, { useState, useEffect } from "react";
import PurchaseScreen from "./PurchaseScreen";
import Cards from "./Cards";
import Footer from "./Footer";
import MapLeaderboardScreen from "./MapLeaderboardScreen";
import Navbar from "./Navbar";
import RestaurantBrowse from "./RestaurantBrowse";

function App(props) {
	const [communities, setCommunities] = useState([]);
	const [people, setPeople] = useState([]);
	const [currentCommunity, setCurrentCommunity] = useState('');

	let host;
	if (
		window.location.hostname === "127.0.0.1" ||
		window.location.hostname === "localhost"
	) {
		host = "http://" + window.location.hostname + ":8000";
	} else {
		host = "http://" + window.location.hostname;
	}

	useEffect(() => {
		getCommunities();
		getPeople();
	}, []);

	const getCommunities = () => {
		fetch(`${host}/api/view/community`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				setCommunities(data.community);
			});
	};

	const getPeople = () => {
		fetch(`${host}/api/view/customer`, {
			method: "GET",
		})
			.then((res) => res.json())
			.then((data) => {
				setPeople(data.customer);
			});
	};

	return (
		<>
			<Navbar />
			<MapLeaderboardScreen communities={communities} people={people} setCurrentCommunity={setCurrentCommunity}/>
			<RestaurantBrowse communities={communities} currentCommunity={currentCommunity}/>
			<PurchaseScreen url={host} />
			<Cards />
			<Footer />
		</>
	);
}

export default App;
