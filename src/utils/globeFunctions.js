import * as d3 from "d3";
import { maxForActiveCategory } from '../stores'

const getDomain = (value, dietData) => {
  const maxValue = Math.max.apply(Math, dietData.map((o) => o?.[value] ))
  const roundedByFiveHundred = Math.ceil(maxValue / 500) * 500
  maxForActiveCategory.set(roundedByFiveHundred)
  return [0, roundedByFiveHundred]
}

const changeFills = (dietData, value, color) => {
  const domain = getDomain(value, dietData)
  const colorScale = d3.scaleLinear().domain(domain).range(["white", color])
  const countries = d3.selectAll('.country')
  countries
    .transition().duration(300).style("fill", (d, i) => {
      const item = dietData.find(item => item.entity === d.properties.name)
      return colorScale(item?.[value])
    })
}

export { getDomain, changeFills }