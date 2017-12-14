import { mealsResponse } from '../ajax-requests/meal-requests.js'
import { appendMeal, appendCalories, appendMealTotals } from "../response-handlers/append-meal.js"
import { appendFood } from "../response-handlers/append-food.js"
import { renderTotalCalsTable } from "../response-handlers/render-total-cals-table.js"
import { renderAllCals } from '../response-handlers/render-meal-cals-table.js'

export { renderMeals, renderAllCals, renderTotalCalsTable }

const $ = require('jquery')

// render meals
function renderMeals() {
    mealsResponse().then(function(mealObjects) {
        for (var i = 0; i < mealObjects.length; i++) {
            let meal = mealObjects[i]
            appendMeal(meal)
            for (var j = 0; j < meal.foods.length; j++) {
                if (meal.foods[j]) {
                appendFood(meal.foods[j], `.list#${meal.name}`, "meal_food")
              }
            }
            appendCalories(meal.name)
            renderAllCals(meal.name)
        }
        renderTotalCalsTable()
    }).catch(function() {
        $(".alert").append("Error Loading Food Tracker")
    })
}
