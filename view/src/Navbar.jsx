import React from "react";
import fresh from "./assets/first2fresh.png";

function Navbar(props) {
	return (
		<nav
			className="navbar navbar-expand-lg navbar-dark sticky-top"
			style={{ backgroundColor: "rgb(8, 133, 41)" }}
		>
			<a
				className="navbar-brand"
				href="#"
				style={{ fontFamily: "Comfortaa, cursive" }}
			>
				<img
					src={fresh}
					width="30"
					height="30"
					className="d-inline-block align-top mr-2"
					alt=""
				/>
				First2Fresh
			</a>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarNav"
				aria-controls="navbarNav"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>
			<div className="collapse navbar-collapse" id="navbarNav">
				<ul className="navbar-nav">
					<li className="nav-item active">
						<a className="nav-link" href="#">
							Home <span className="sr-only">(current)</span>
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#browse">
							Browse
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#order">
							Order
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="#rewards">
							Rewards
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
