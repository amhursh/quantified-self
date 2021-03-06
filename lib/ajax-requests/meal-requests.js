export { mealsResponse, addFoodToMeal, deleteFoodfromMeal }

const $ = require('jquery')
const url = "https://quantified-self-aabs-api.herokuapp.com/api/v1/meals"

function mealsResponse() {
  return $.get(url)
}

function addFoodToMeal(mealId, foodId) {
  let postUrl = `${url}/${mealId}/foods/${foodId}`
  return $.post(postUrl)
}

function deleteFoodfromMeal(meal_id, food_id) {
  return $.ajax({
      url: `${url}/${meal_id}/foods/${food_id}`,
      type: 'DELETE',
      success: (result) => {
        alert(`You  removed food from meal!`)
      },
      error: (result) => {
        alert(result)
      }
  })
}

