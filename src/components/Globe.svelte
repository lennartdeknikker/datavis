<script>
	import {getBaseValues, updatePosition, updateMaxDimensions, updateAllItems} from '../utils/globeItemFunctions'
	import * as d3 from "d3";
  import { onMount } from 'svelte'
  import data from '../data/test.json'
  import geoJson from '../data/map.json'
	// source: https://ourworldindata.org/diet-compositions#diet-compositions-by-food-groups
	import dietData from '../data/diet.json'

	onMount(() => {
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
				.attr("fill", (d, i) => {
					const item = dietData.find(item => item.entity === d.properties.name)
          console.log('🚀 ~ item', item?.cereals)
				})
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
				const thisItem = d3.select(this)
				thisItem
				.style("max-width", "100px")
				.style("max-height", "100px")
				updatePosition(baseValues, projection, thisItem.node())
			})		
			.on("mouseout", function () {
				const thisItem = d3.select(this)
				updateMaxDimensions(baseValues, thisItem.node())
				updatePosition(baseValues, projection, thisItem.node())
			})
			.on("click", (d, i) => {
				console.log(d)
			} )

			items.append("img")
			.attr("class", "item-image")
			.attr("src", (d) => d.photos[0].path)
    }
    
		const rotateGlobe = () => {
			d3.timer(() => {
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
			// rotateGlobe()
			addItems()
	})
</script>

<style>
	#map {
		width: 100vw;
		height: 100vh;
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
		max-width: 50px;
		max-height: 50px;
		display: flex;
		border: 2px solid #9db3b0;
		cursor: pointer;
	}

	:global(.item-image) {
		width: 100%;
		object-fit: cover;
	}
</style>

<div id="map">
</div>