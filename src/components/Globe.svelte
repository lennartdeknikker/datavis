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


		const updateAllItemPositions = function (projection) {
			d3.selectAll('.item')
				.style("left", function (d) {
					const correction = this.getBoundingClientRect().width / 2
					return projection(d.location)[0] - correction + "px"
				})
				.style("top", function (d) {
					const correction = this.getBoundingClientRect().height / 2
					return projection(d.location)[1] - correction + "px"
				})
				.style("max-width", function (d) {
					const height = 500
					const range = 50
					const shrinkage = 0.6

					const difference = Math.abs((projection(d.location)[1]) - (height / 2))
					const percentage = difference / (height / 2)
          console.log('🚀 ~ percentage', percentage)
					return `${range - (percentage * (shrinkage * range))}px`
				})
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

			items.append("img")
			.attr("class", "item-image")
			.attr("src", (d) => d.photos[0])
			.on("mouseover", function () {d3.select(this).style("max-width", "100px"); updateAllItemPositions(projection)})		
			.on("mouseout", function () {d3.select(this).style("max-width", null); updateAllItemPositions(projection)})
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
	border: 3px solid #208771;
	border-radius: 3px;
}

:global(.item-image) {
	width: 100%;
	max-width: 50px;
}

.tooltip {
	width: 100px;
	height: 50px;
	background-color: rgb(0, 126, 126);
	position: fixed;
	top: 0;
	left: 0;
}

img {
	width: 100px;
}

</style>

<div class="tooltip">
	<h3>{title}</h3>
	<img {src} {alt}>
</div>
<div id="map">
</div>