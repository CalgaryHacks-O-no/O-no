import React, { useEffect } from "react";
import * as d3 from "d3";

function PointsBreakdown(props) {
	const { price, tip, curbsidePickup } = props;

	useEffect(() => {
		const priceBeforeTax = Math.ceil(price);
		const tipMultiplied = parseFloat(Math.ceil(tip)) * 2;
		const visitMultiplier = 3;
		const curbsideBonus = curbsidePickup ? 15 : 0;

		const totalPoints =
			(priceBeforeTax + tipMultiplied + curbsideBonus) * visitMultiplier;
		const priceProp = (priceBeforeTax / totalPoints) * 0.9;
		const tipProp = tipMultiplied / totalPoints;
		const curbsideProp = curbsideBonus / totalPoints;
		const visitProp = (priceProp + tipProp) * (visitMultiplier - 0.9);

		let pieContents = {
			price: {
				key: "price",
				text: priceBeforeTax,
				label: "Price",
				value: priceProp,
				fill: "#feb347",
			},
			tip:
				tip > 0
					? {
							key: "tip",
							text: tipMultiplied,
							label: "Tip",
							value: tipProp,
							fill: "rgb(15, 232, 142)",
					  }
					: null,
			visits: {
				text: `${visitMultiplier}x`,
				label: "New Visit",
				value: visitProp,
				fill: "rgb(15, 137, 252)",
			},
			curbsidePickup: curbsidePickup
				? {
						text: curbsideBonus,
						label: "Curbside Pickup",
						value: curbsideProp,
						fill: "rgb(180, 52, 235)",
				  }
				: null,
		};

		let pieData = [];
		Object.entries(pieContents).forEach(([k, v]) => {
			if (!v) {
				return;
			}

			pieData.push({
				key: k.toString(),
				...v,
			});
		});

		const pie = d3.pie().value((d) => d.value);
		const pieArcData = pie(pieData);

		const radiusScale = 0.8;
		const innerRadius = Math.floor(210 * radiusScale);
		const midRadius = Math.floor(310 * radiusScale);
		const outerRadius = Math.floor(360 * radiusScale);

		const arcPie = d3
			.arc()
			.innerRadius(innerRadius)
			.outerRadius(midRadius)
			.padRadius(Math.floor(300 * radiusScale))
			.padAngle(Math.floor((2 / 300) * radiusScale))
			.cornerRadius(Math.floor(16 * radiusScale));

		const bigArcPie = d3
			.arc()
			.innerRadius(midRadius)
			.outerRadius(outerRadius);

		const svgCanvas = d3.select(".pointsBreakdown");

		// svgCanvas
		// 	.selectAll(".arcs")
		// 	.data(pieArcData, (d) => d.key)
		// 	.enter()
		// 	.append("path")
		// 	.attr("fill", (d) => d.data.fill)
		// 	.attr("d", arcPie);

		// svgCanvas
		// 	.selectAll(".innerText")
		// 	.data(pieArcData, (d) => d.key)
		// 	.enter()
		// 	.append("text")
		// 	.text((d) => d.data.text)
		// 	.attr("fill", "white")
		// 	.attr("font-family", "Comfortaa, cursive")
		// 	.attr("font-size", 24)
		// 	.attr("font-weight", "bold")
		// 	.attr("text-anchor", "middle")
		// 	.attr("dy", "0.2em")
		// 	.attr("transform", (d) => `translate(${arcPie.centroid(d)})`);

		// svgCanvas
		// 	.selectAll(".outerText")
		// 	.data(pieArcData, (d) => d.key)
		// 	.enter()
		// 	.append("text")
		// 	.text((d) => d.data.label)
		// 	.attr("fill", "black")
		// 	.attr("font-family", "Comfortaa, cursive")
		// 	.attr("font-size", 24)
		// 	.attr("text-anchor", (d) => {
		// 		const [centroidX, centroidY] = bigArcPie.centroid(d);
		// 		if (Math.abs(centroidX / outerRadius) < 0.3) {
		// 			return "middle";
		// 		} else if (centroidX > 0) {
		// 			return "start";
		// 		} else {
		// 			return "end";
		// 		}
		// 	})
		// 	.attr("transform", (d) => `translate(${bigArcPie.centroid(d)})`);

		let paths = svgCanvas.selectAll("path");
		paths
			.data(pieArcData, (d) => d.key)
			.join(
				(enter) =>
					enter
						.append("path")
						.attr("fill", (d) => d.data.fill)
						.attr("d", arcPie),
				(update) => update,
				(exit) => exit.remove()
			);

		let innerTexts = svgCanvas.selectAll(".innerText");
		innerTexts
			.data(pieArcData, (d) => d.key)
			.join(
				(enter) =>
					enter
						.append("text")
						.attr("className", "innerText")
						.text((d) => d.data.text)

						.attr(
							"transform",
							(d) => `translate(${arcPie.centroid(d)})`
						),
				(update) => update,
				(exit) => exit.remove()
			)
			.attr("fill", "white")
			.attr("font-family", "Comfortaa, cursive")
			.attr("font-size", 24)
			.attr("font-weight", "bold")
			.attr("text-anchor", "middle")
			.attr("dy", "0.2em");

		let outerTexts = svgCanvas.selectAll(".outerText");
		outerTexts
			.data(pieArcData, (d) => d.key)
			.join(
				(enter) =>
					enter
						.append("text")
						.attr("className", "outerText")
						.text((d) => d.data.label)
						.attr(
							"transform",
							(d) => `translate(${bigArcPie.centroid(d)})`
						),
				(update) => update,
				(exit) => exit.remove()
			)
			.attr("fill", "black")
			.attr("font-family", "Comfortaa, cursive")
			.attr("font-size", 24)
			.attr("text-anchor", (d) => {
				const [centroidX, centroidY] = bigArcPie.centroid(d);
				if (Math.abs(centroidX / outerRadius) < 0.3) {
					return "middle";
				} else if (centroidX > 0) {
					return "start";
				} else {
					return "end";
				}
			});

		svgCanvas
			.selectAll(".totalPoints")
			.data([totalPoints], (d) => true)
			.enter()
			.append("text")
			.text((d) => d)
			.attr("text-anchor", "middle")
			.attr("x", 0)
			.attr("y", 0)
			.attr("dy", "0.3em")
			.attr("font-family", "Comfortaa, cursive")
			.attr("font-size", 100)
			.attr("fill", "rgb(8, 201, 40)");
	}, [price, tip, curbsidePickup]);

	const canvasSize = 640;

	return (
		<div className="d-flex justify-content-center">
			<svg
				className="pointsBreakdown"
				viewBox={[
					-canvasSize / 2,
					-canvasSize / 2,
					canvasSize,
					canvasSize,
				].join(" ")}
				width={1000}
				height={640}
				fontFamily="sans-serif"
			/>
		</div>
	);
}

export default PointsBreakdown;
