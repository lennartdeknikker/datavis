<script>
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
			.attr("fill", "#EEE")
			.attr("stroke", "#000")
			.attr("stroke-width", "0.2")
			.attr("cx", width/2)
			.attr("cy", height/2)
			.attr("r", initialScale)
			.style("cursor", "grab")

		svg
			.call(d3.drag().on('drag', (event) => {
				const rotate = projection.rotate()
				const k = sensitivity / projection.scale()
				projection.rotate([
					rotate[0] + event.dx * k,
					rotate[1] - event.dy * k
				])
				path = d3.geoPath().projection(projection)
				svg.selectAll("path").attr("d", path)
				console.log(projection(["52.08413659728907", "4.885266573166416"]))
				svg.selectAll('.location').attr("cx", d => projection(d.location)[0]).attr("cy", d => projection(d.location)[1])
			}))
			.call(d3.zoom().on('zoom', (event) => {
				if(event.transform.k > 0.3) {
					projection.scale(initialScale * event.transform.k)
					path = d3.geoPath().projection(projection)
					svg.selectAll("path").attr("d", path)
					svg.selectAll('.location').attr("cx", d => projection(d.location)[0]).attr("cy", d => projection(d.location)[1])
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
					.selectAll("path")
					.data(geoJson.features)
					.enter().append("path")
					.attr("class", "country")
					.attr("d", path)
					.attr("fill", "green")
					.style('stroke', 'black')
					.style('stroke-width', 0.3)
					.style("opacity",0.8)
					.style("cursor", "grab")
		}

		const addLocations = () => {
      let locations = svg.append("g")
      locations.append("g")
      .selectAll("circle")
      .data(data.entries)
			.enter().append("circle")
      .attr("class", "location")
			.attr("cx", d => projection(d.location)[0])
			.attr("cy", d => projection(d.location)[1])
			.attr("r", 10)
			.attr("fill", "red")
    }
    
		const rotateGlobe = () => {
			d3.timer(function(elapsed) {
				const rotate = projection.rotate()
				const k = sensitivity / projection.scale()
				projection.rotate([
					rotate[0] - 1 * k,
					rotate[1]
				])
				path = d3.geoPath().projection(projection)
				svg.selectAll("path").attr("d", path)
			},200)
		}

			loadMap()
			// rotateGlobe()
			addLocations()
	})
</script>

<style>
	#map {
  width: 100%;
  height: 100%;
}

</style>

<div id="map"></div>