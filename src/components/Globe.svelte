<script>
	let title = 'test title'
	let src = 'test'
	let alt = 'test'
	import * as d3 from "d3";
  import { onMount } from 'svelte'
  import data from '../data/test.json'
  import geoJson from '../data/map.json'

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

			const maxValue = 50
			const shrinkage = 0.8
			const globeDimensions = globe.node().getBoundingClientRect();
			const globeCenterX = globeDimensions.left + globeDimensions.width / 2
			const globeCenterY = globeDimensions.top + globeDimensions.height / 2
			const maxDistance = globeDimensions.width / 2

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
				updateAllItemPositions(projection)
			}))
			.call(d3.zoom().on('zoom', function (event) {
				if(event.transform.k > 0.3) {
					projection.scale(initialScale * event.transform.k)
					path = d3.geoPath().projection(projection)
					svg.selectAll("path").attr("d", path)
					updateAllItemPositions(projection)
					globe.attr("r", projection.scale())
				}
				else {
					event.transform.k = 0.3
				}
			}))

		const updatePosition = item => {
			const correction = item.getBoundingClientRect().width / 2
			const coordinates = [item.dataset.latitude, item.dataset.longitude]
			console.log('🚀 ~ coordinates', coordinates)
			const itemCoordinates = projection(coordinates)
			item.style.left = `${itemCoordinates[0] - correction}px`
			item.style.top = `${itemCoordinates[1] - correction}px`
		}

		const updatePositionForAllItems = () => {
			const items = document.querySelectorAll('.item')
			items.forEach(item => {
				updatePosition(item)
			})
		}

		const updateMaxDimensions = item => {
			const itemDimensions = item.getBoundingClientRect()
			const itemCenterX = itemDimensions.left + itemDimensions.width / 2
			const itemCenterY = itemDimensions.top + itemDimensions.height / 2

			const xDifference = Math.abs(itemCenterX - globeCenterX)
			const yDifference = Math.abs(globeCenterY - itemCenterY)
			const distance = Math.sqrt((xDifference * xDifference) + (yDifference * yDifference))
			const max = `${maxValue - (maxValue * shrinkage * (distance / maxDistance))}px`

			item.style.maxWidth = max	
			item.style.maxHeight = max
		}

		const updateMaxDimensionsForAllItems = () => {
			const items = document.querySelectorAll('.item')
			items.forEach(item => {
				updateMaxDimensions(item)	
			});
		}

		const updateAllItemPositions = () => {
			const items = d3.selectAll('.item')
			updateMaxDimensionsForAllItems()
			updatePositionForAllItems(items)
		}


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
				const thisItem = d3.select(this)
				thisItem
				.style("max-width", "100px")
				.style("max-height", "100px")
				updatePosition(thisItem.node())
			})		
			.on("mouseout", function () {
				const thisItem = d3.select(this)
				updateMaxDimensions(thisItem.node())
				updatePosition(thisItem.node())
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
				updateAllItemPositions(projection)
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