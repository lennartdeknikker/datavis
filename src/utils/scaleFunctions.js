const calculateTotalIntakeForCategory = (category, dietData) => {
  return dietData.reduce((acc, curr) => acc + curr?.[category], 0)
}

const calculateTotalIntakeForAllCategories = (dietData) => {
  let acc = 0
  for ( const category in dietData[0]) {
    if (!['entity', 'year', 'code'].includes(category)) acc += calculateTotalIntakeForCategory(category, dietData)
  }
  return acc
}


export {calculateTotalIntakeForCategory, calculateTotalIntakeForAllCategories}