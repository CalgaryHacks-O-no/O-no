import React from "react";
import freshImg from "./assets/first2fresh.png";

function AboutUs(props) {
	return (
		<div className="row">
			<div className="col-lg-6">
				<div
					className="container mx-3 px-3"
					style={{
						minHeight: 500,
						display: "flex",
						alignItems: "center",
					}}
				>
					<div>
						<h1 style={{ fontFamily: "Comfortaa, cursive" }}>
							Help local, win points, get rewards
						</h1>
						<p>
							First2Fresh enables you to help your community by
							exploring eats around you. Browse our Calgary list
							and get rewards for trying something new! To begin,
							search for your community, and select a restaurant.
						</p>
					</div>
				</div>
			</div>
			<div className="col">
				<div className="d-flex justify-content-center my-5">
					<img src={freshImg} style={{ width: "60%" }} />
				</div>
			</div>
		</div>
	);
}

export default AboutUs;
