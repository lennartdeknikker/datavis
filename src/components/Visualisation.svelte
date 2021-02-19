<script>
	import { activeCategoryId, totalConsumption, totalForActiveCategory, categoryColor } from '../stores'
	import {getBaseValues, updatePosition, updateMaxDimensions, updateAllItems, unclickAllItems} from '../utils/globeItemFunctions'
	import {calculateTotalIntakeForCategory, calculateTotalIntakeForAllCategories} from '../utils/scaleFunctions'
	import {changeFills} from '../utils/globeFunctions'

	import * as d3 from "d3";
  import { onMount } from 'svelte'
  import data from '../data/fridges.json'
  import geoJson from '../data/map.json'
	// source: https://ourworldindata.org/diet-compositions#diet-compositions-by-food-groups
	import dietData from '../data/diet.json'

	onMount(() => {
		let rotator		
		let mapWidth = d3.select("#map").node().getBoundingClientRect().width
		let mapHeight = d3.select("#map").node().getBoundingClientRect().height
		let sensitivity = 75
		let projection = d3.geoOrthographic()
			.scale(window.innerWidth < 500 ? 100 : 200)
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

		svg
			.call(d3.drag().on('drag', function (event) {
				rotator?.stop()
				unclickAllItems(projection)
				const rotate = projection.rotate()
				const k = sensitivity / projection.scale()
				projection.rotate([
					rotate[0] + event.dx * k,
					rotate[1] - event.dy * k
				])
				path = d3.geoPath().projection(projection)
				svg.selectAll("path").attr("d", path)
				updateAllItems(getBaseValues(), projection)
			}))
			.call(d3.zoom().on('zoom', function (event) {
				rotator?.stop()
				unclickAllItems(projection)
				if(event.transform.k > 0.3) {
					projection.scale(initialScale * event.transform.k)
					path = d3.geoPath().projection(projection)
					svg.selectAll("path").attr("d", path)
					updateAllItems(getBaseValues(), projection)
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
					thisItem.style.zIndex = 1
					updatePosition(projection, thisItem)
				}
			})		
			.on("mouseout", function () {
				const thisItem = d3.select(this).node()
				if (thisItem.dataset.clicked !== "true") {
					thisItem.style.zIndex = 0
					updateMaxDimensions(getBaseValues(), thisItem)
					updatePosition(projection, thisItem)
				}
			})
			.on("click", function () {
				rotator?.stop()
				const thisItem = d3.select(this).node()
				unclickAllItems(projection, thisItem)
				if (thisItem.dataset.clicked === "true") {
					thisItem.dataset.clicked = "false"
					thisItem.classList.remove('clicked')
					updateMaxDimensions(getBaseValues(), thisItem)
				} else {
					thisItem.dataset.clicked = "true"
					thisItem.classList.add('clicked')
					thisItem.style.width = null
					thisItem.style.height = null
				}
				updatePosition(projection, thisItem)
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
				updateAllItems(getBaseValues(), projection)
			},200)
		}

			loadMap()
			rotateGlobe()
			addItems()
			activeCategoryId.subscribe(value => {changeFills(dietData, value, $categoryColor); totalForActiveCategory.set(calculateTotalIntakeForCategory(value, dietData))})
			totalConsumption.set(calculateTotalIntakeForAllCategories(dietData))
	})
</script>

<style>
	.visualisation {
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
		border: 2px solid var(--category-color);
		cursor: pointer;
	}

	:global(.item.clicked) {
		z-index: 10;
		border: 10px solid var(--category-color);
		width: 300px;
		height: 300px;
	}

	:global(.item.hidden) {
		display: none;
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