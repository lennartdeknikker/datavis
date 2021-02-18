import * as d3 from "d3";

const getBaseValues = () => {
  const globe = document.querySelector('.globe')
  const globeDimensions = globe.getBoundingClientRect()
  return {
    maxValue: 50,
    shrinkage: 0.8,
    globeWidth: globeDimensions.width,
    globeHeight: globeDimensions.height,
    globeCenterX: globeDimensions.left + globeDimensions.width / 2,
    globeCenterY: globeDimensions.top + globeDimensions.height / 2,
    maxDistance: globeDimensions.width / 2,
  }
}

const updatePosition = (projection, item) => {
  const correction = item.getBoundingClientRect().width / 2
  const coordinates = [item.dataset.latitude, item.dataset.longitude]
  const itemCoordinates = projection(coordinates)
  const baseValues = getBaseValues()
  const globeCenter = [baseValues.globeCenterX, baseValues.globeCenterY]
  const gDistance = d3.geoDistance(coordinates, projection.invert(globeCenter))
  const shouldNotShow = gDistance > 1.5
  shouldNotShow ? item.classList.add('hidden') : item.classList.remove('hidden')
  item.style.left = `${itemCoordinates[0] - correction}px`
  item.style.top = `${itemCoordinates[1] - correction}px`  
}

const updatePositionForAllItems = (projection) => {
  const items = document.querySelectorAll('.item')
  items.forEach(item => {
    updatePosition(projection, item)
  })
}

const updateMaxDimensions = (baseValues, item) => {
  const {maxValue, shrinkage, globeCenterX, globeCenterY, maxDistance} = baseValues
  const itemDimensions = item.getBoundingClientRect()
  const itemCenterX = itemDimensions.left + itemDimensions.width / 2
  const itemCenterY = itemDimensions.top + itemDimensions.height / 2
  const xDifference = Math.abs(itemCenterX - globeCenterX)
  const yDifference = Math.abs(globeCenterY - itemCenterY)
  const distance = Math.sqrt((xDifference * xDifference) + (yDifference * yDifference))
  const max = `${maxValue - (maxValue * shrinkage * (distance / maxDistance))}px`

  item.style.width = max	
  item.style.height = max
}

const updateMaxDimensionsForAllItems = (baseValues) => {
  const items = document.querySelectorAll('.item')
  items.forEach(item => {
    updateMaxDimensions(baseValues, item)	
  });
}

const updateAllItems = (baseValues, projection) => {
  updateMaxDimensionsForAllItems(baseValues)
  updatePositionForAllItems(projection)
}

const unclickAllItems = (projection, thisItem = null) => {
  const otherClickedElement = document.querySelector(`[data-clicked="true"]`)
  if (otherClickedElement && otherClickedElement !== thisItem) {
    otherClickedElement.dataset.clicked = "false"
    otherClickedElement.classList.remove('clicked')
    updateMaxDimensions(getBaseValues(), otherClickedElement)
    updatePosition(projection, otherClickedElement)
  }
}

export {getBaseValues, updatePosition, updatePositionForAllItems, updateMaxDimensions, updateMaxDimensionsForAllItems, updateAllItems, unclickAllItems}