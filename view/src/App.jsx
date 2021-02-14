import React, { useState, useEffect } from "react";
import PurchaseScreen from "./PurchaseScreen";
import Cards from "./Cards";
import Footer from "./Footer";
import MapLeaderboardScreen from "./MapLeaderboardScreen";
import Navbar from "./Navbar";
import RestaurantBrowse from "./RestaurantBrowse";

function App(props) {
	const [communities, setCommunities] = useState([]);
	const [commRestaurants, setCommRestaurants] = useState([]);
	const [people, setPeople] = useState([]);
	const [currentCommunity, setCurrentCommunity] = useState({});
	const [orderRestaurant, setOrderRestaurant] = useState();

	let host;
	if (
		window.location.hostname === "127.0.0.1" ||
		window.location.hostname === "localhost"
	) {
		host = "http://" + window.location.hostname + ":8000";
	} else {
		host = "https://" + window.location.hostname;
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
			<MapLeaderboardScreen communities={communities}
								  people={people}
								  setCurrentCommunity={setCurrentCommunity}
								  commRestaurants={commRestaurants}/>
			<RestaurantBrowse url={host}
							  communities={communities}
							  currentCommunity={currentCommunity}
							  setCurrentCommunity={setCurrentCommunity}
							  setCommRestaurants={setCommRestaurants}
							  setOrderRestaurant={setOrderRestaurant}
			/>
			<PurchaseScreen url={host}
							currentCommunity={currentCommunity}
							orderRestaurant={orderRestaurant}
			/>
			<Cards />
			<Footer />
		</>
	);
}

export default App;
