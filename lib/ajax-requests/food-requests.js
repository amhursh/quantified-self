const $ = require('jquery')
const url = "https://quantified-self-aabs.herokuapp.com/api/v1/foods"

import { removeFromFoodsTable } from '../event-listeners/food-listener'

function deleteFood(id) {
  $.ajax({
      url: `${url}/${id}`,
      type: 'DELETE',
      success: (result) => {
        removeFromFoodsTable(id)
      },
      error: (result) => {
        alert('Error: This food is currently part of a meal. Please remove in your diary first.')
      }
  })
}

function updateFood(foodObject) {
  $.ajax({
      url: `${url}/${foodObject.id}`,
      data: {food: foodObject},
      type: 'PATCH'
  })
}

function foodsResponse() {
  return $.get(url)
}

function createFood(foodObject) {
  return $.post(url, {food: foodObject})
}

export { createFood, deleteFood, updateFood, foodsResponse }
