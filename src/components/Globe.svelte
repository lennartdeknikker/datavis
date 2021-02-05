<script>
	let title = 'test title'
	let src = 'test'
	let alt = 'test'
	import * as d3 from "d3";
  import { onMount } from 'svelte'
  import data from '../data/data.json'
  import geoJson from '../data/map.json'

	onMount(() => {
		let width = d3.select("#map").node().getBoundingClientRect().width
		let height = d3.select("#map").node().getBoundingClientRect().height
		let sensitivity = 75

		let projection = d3.geoOrthographic()
			.scale(250)
			.center([0, 0])
			.rotate([0,-30])
			.translate([width / 2, height / 2])

		const initialScale = projection.scale()
		let path = d3.geoPath().projection(projection)

		let svg = d3.select('#map')
			.append("svg")
			.attr("width", width)
			.attr("height", height)

		let globe = svg.append("circle")
			.attr('class', 'globe')
			.attr("cx", width/2)
			.attr("cy", height/2)
			.attr("r", initialScale)

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

		const updatePosition = (items) => {
			items
				.style("left", function (d) {
					const correction = this.getBoundingClientRect().width / 2
					return projection(d.location)[0] - correction + "px"
				})
				.style("top", function (d) {
					const correction = this.getBoundingClientRect().height / 2
					return projection(d.location)[1] - correction + "px"
				})
		}

		const updateMaxWidth = (items) => {
			let maxWidth = '0px'
			items.style("max-width", function () {
					const maxHeight = 50
					const shrinkage = 0.8

					const globe = d3.select('.globe').node().getBoundingClientRect();
					const globeCenterX = globe.left + globe.width / 2
					const globeCenterY = globe.top + globe.height / 2
					const maxDistance = globe.width / 2

					const item = d3.select(this).node().getBoundingClientRect()
					const itemCenterX = item.left + item.width / 2
					const itemCenterY = item.top + item.height / 2

					const xDifference = Math.abs(itemCenterX - globeCenterX)
					const yDifference = Math.abs(globeCenterY - itemCenterY)
					const distance = Math.sqrt((xDifference * xDifference) + (yDifference * yDifference))
					maxWidth = `${maxHeight - (maxHeight * shrinkage * (distance / maxDistance))}px`				
					return maxWidth
				})
				.style("max-height", maxWidth)
				
		}

		const updateAllItemPositions = () => {
			const items = d3.selectAll('.item')
			updatePosition(items)
			updateMaxWidth(items)
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
      .data(data.entries)
			.enter().append("div")
			.attr("class", "item")
			.style("left", d => projection(d.location)[0] - 25 + "px")
			.style("top", d => projection(d.location)[1] - 25 + "px")
			.on("mouseover", function () {
				const thisItem = d3.select(this)
				thisItem
				.style("max-width", "100px")
				.style("max-height", "100px")
				updatePosition(thisItem)
			})		
			.on("mouseout", function () {
				const thisItem = d3.select(this)
				updateMaxWidth(thisItem)
				updatePosition(thisItem)
			})

			items.append("img")
			.attr("class", "item-image")
			.attr("src", (d) => d.photos[0])
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
		max-width: 50px;
		max-height: 50px;
		display: flex;
		border: 2px solid #9db3b0;
	}

	:global(.item-image) {
		width: 100%;
		object-fit: cover;
	}
</style>

<div id="map">
</div>