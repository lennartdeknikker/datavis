<script>
	import { activeCategoryId, maxForActiveCategory, totalConsumption, totalForActiveCategory } from '../stores'
	import {getBaseValues, updatePosition, updateMaxDimensions, updateAllItems} from '../utils/globeItemFunctions'
	import * as d3 from "d3";
  import { onMount } from 'svelte'
  import data from '../data/fridges.json'
  import geoJson from '../data/map.json'
	// source: https://ourworldindata.org/diet-compositions#diet-compositions-by-food-groups
	import dietData from '../data/diet.json'

	onMount(() => {
		let rotator
		const getDomain = value => {
			const maxValue = Math.max.apply(Math, dietData.map((o) => o?.[value] ))
			const roundedByFiveHundred = Math.ceil(maxValue / 500) * 500
			maxForActiveCategory.set(roundedByFiveHundred)
			return [0, roundedByFiveHundred]
		}

		const calculateTotalIntakeForCategory = (category) => {
			return dietData.reduce((acc, curr) => acc + curr?.[category], 0)
		}

		const calculateTotalIntakeForAllCategories = () => {
			let acc = 0
			for ( const category in dietData[0]) {
				if (!['entity', 'year', 'code'].includes(category)) acc += calculateTotalIntakeForCategory(category)
			}
			return acc
		}



		const changeFills = (value, color) => {
			const domain = getDomain(value)
			const colorScale = d3.scaleLinear().domain(domain).range(["white", color])
			const countries = d3.selectAll('.country')
			countries
				.transition().duration(300).style("fill", (d, i) => {
					const item = dietData.find(item => item.entity === d.properties.name)
					return colorScale(item?.[value])
				})
		}

		let mapWidth = d3.select("#map").node().getBoundingClientRect().width
		let mapHeight = d3.select("#map").node().getBoundingClientRect().height
		let sensitivity = 75

		let projection = d3.geoOrthographic()
			.scale(250)
			.center([0, 0])
			.rotate([0,-30])
			.translate([mapWidth / 2, mapHeight / 2])

		const initialScale = projection.scale()
		let path = d3.geoPath().projection(projection)

		let svg = d3.select('#map')
			.append("svg")
			.attr("width", mapWidth)
			.attr("height", mapHeight)

		let globe = svg.append("circle")
			.attr('class', 'globe')
			.attr("cx", mapWidth/2)
			.attr("cy", mapHeight/2)
			.attr("r", initialScale)

		const baseValues = getBaseValues()

		svg
			.call(d3.drag().on('drag', function (event) {
				rotator?.stop()
				const rotate = projection.rotate()
				const k = sensitivity / projection.scale()
				projection.rotate([
					rotate[0] + event.dx * k,
					rotate[1] - event.dy * k
				])
				path = d3.geoPath().projection(projection)
				svg.selectAll("path").attr("d", path)
				updateAllItems(baseValues, projection)
			}))
			.call(d3.zoom().on('zoom', function (event) {
				rotator?.stop()
				if(event.transform.k > 0.3) {
					projection.scale(initialScale * event.transform.k)
					path = d3.geoPath().projection(projection)
					svg.selectAll("path").attr("d", path)
					updateAllItems(baseValues, projection)
					globe.attr("r", projection.scale())
				}
				else {
					event.transform.k = 0.3
				}
			}))

		const loadMap = () => {
			let map = svg.append("g")
			map.append("g")
				.attr("class", "countries")
				.selectAll(".country")
				.data(geoJson.features)
				.enter().append("path")
				.attr("class", "country")
				.attr("d", path)
		}

		const addItems = () => {
			const items = d3.select("#map").append("div")
      .selectAll(".item")
      .data(data.fridges)
			.enter().append("div")
			.attr("class", "item")
			.attr("data-latitude", d => d.location[0])
			.attr("data-longitude", d => d.location[1])
			.style("left", d => projection(d.location)[0] - 25 + "px")
			.style("top", d => projection(d.location)[1] - 25 + "px")
			.on("mouseover", function () {
				const thisItem = d3.select(this).node()
				if (thisItem.dataset.clicked !== "true") {
					thisItem.style.width = "55px"
					thisItem.style.height = "55px"
					updatePosition(baseValues, projection, thisItem)
				}
			})		
			.on("mouseout", function () {
				const thisItem = d3.select(this).node()
				if (thisItem.dataset.clicked !== "true") {
					updateMaxDimensions(baseValues, thisItem)
					updatePosition(baseValues, projection, thisItem)
				}
			})
			.on("click", function (d, i) {
				const thisItem = d3.select(this).node()

				// unclick other items
				const otherClickedElement = document.querySelector(`[data-clicked="true"]`)
				if (otherClickedElement && otherClickedElement !== thisItem) {
					otherClickedElement.dataset.clicked = "false"
					otherClickedElement.classList.remove('clicked')
					updateMaxDimensions(baseValues, otherClickedElement)
					updatePosition(baseValues, projection, otherClickedElement)
				}
				if (thisItem.dataset.clicked === "true") {
					thisItem.dataset.clicked = "false"
					thisItem.classList.remove('clicked')
					updateMaxDimensions(baseValues, thisItem)
				} else {
					thisItem.dataset.clicked = "true"
					thisItem.classList.add('clicked')
					thisItem.style.width = null
					thisItem.style.height = null
				}
				updatePosition(baseValues, projection, thisItem)
			} )

			items.append("img")
			.attr("class", "item-image")
			.attr("src", (d) => d.photos[0].path)
    }
    
		const rotateGlobe = () => {
			rotator = d3.timer(() => {
				const rotate = projection.rotate()
				const k = sensitivity / projection.scale()
				projection.rotate([
					rotate[0] - 1 * k,
					rotate[1]
				])
				path = d3.geoPath().projection(projection)
				svg.selectAll("path").attr("d", path)
				updateAllItems(baseValues, projection)
			},200)
		}

			loadMap()
			rotateGlobe()
			addItems()
			activeCategoryId.subscribe(value => {changeFills(value, 'blue'); totalForActiveCategory.set(calculateTotalIntakeForCategory(value))})
			totalConsumption.set(calculateTotalIntakeForAllCategories())
	})
</script>

<style>
	.visualisation {
		min-width: 500px;
		min-height: 500px;
		width: 100vw;
		height: 100vh;
	}

	#map {
		width: 100%;
		height: 100%;
	}

	:global(.globe) {
		fill: #fafffe;
		stroke-width: 0.2;
		stroke: #9db3b0;
		cursor: grab;
	}

	:global(.country) {
		fill: #c3d4d1;
		stroke: #9db3b0;
		stroke-width: 0.3;
		opacity: 0.8;
		cursor: grab;
	}

	:global(.item) {
		position: absolute;
		border-radius: 50%;
		overflow: hidden;
		width: 50px;
		height: 50px;
		display: flex;
		border: 2px solid #9db3b0;
		cursor: pointer;
	}

	:global(.item.clicked) {
		z-index: 2;
		border: 10px solid blue;
		width: 300px;
		height: 300px;
	}

	:global(.item-image) {
		width: 100%;
		object-fit: cover;
	}
</style>

<div class="visualisation">
	<div id="map">
	</div>
</div>