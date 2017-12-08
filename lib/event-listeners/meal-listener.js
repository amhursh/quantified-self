const $ = require('jquery')
import { renderMeals, renderAllCals, renderMealTotals, renderTotalCalsTable } from '../response-handlers/all_meal_objects'
import { addFoodToMeal, deleteFoodfromMeal } from '../ajax-requests/meal-requests'
import { appendMealTotals } from '../response-handlers/append-meal'
import { getCheckedFoods, updatePage, clearMealTables, clearCheckBoxes } from '../event-listeners/helpers/meal-misc'

$(document).ready(() => {

  renderMeals()
  appendMealTotals()

  // $('.list').on({
  //   blur: function (event) {
  //     event.preventDefault()
  //     let meal = $(this).parents('table').attr('id')
  //     renderAllCals(meal)
  //     renderTotalCalsTable()
  //    }
  // }, '.calories')

  $('.meal-buttons').on({
    click: function (event) {
      event.preventDefault()
      let mealId = this.id
      let foodIds = getCheckedFoods()
      let promiseArray = []
      for(let i = 0; i < foodIds.length; i++) {
        promiseArray.push(addFoodToMeal(mealId, foodIds[i]))
      }
      Promise.all(promiseArray).then( function() {
        updatePage()
      }
      )
    }
  }, '.add-food-to-meal')

  $('.allmeals').on({
    mouseenter: function () {
      $(this).prop("src", "src/x-button.svg")
    },
    mouseleave: function () {
      $(this).prop("src", "src/delete.svg")
    },
    click: function () {
      let food_id = $(this).parents("tr").attr('id')
      let meal_id = $(this).parents("table").attr("rel")
      let mealName = $(this).parents('table').attr('id')
      deleteFoodfromMeal(meal_id, food_id).then(
        $(this).parents('tr').remove(),
        renderAllCals(mealName),
        renderTotalCalsTable()
      )
    }
  }, '.meal_food_delete_button')

})
