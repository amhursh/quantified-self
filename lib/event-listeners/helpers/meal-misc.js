import { renderMeals } from '../../response-handlers/all_meal_objects'

export { getCheckedFoods, updatePage, clearMealTables, clearCheckBoxes }

const $ = require('jquery')

function getCheckedFoods() {
    let foodIds = []
    $(':checked').each((index, val) => {
        foodIds.push(val.id)
    })
    return foodIds
}

function updatePage() {
  clearCheckBoxes()
  renderMeals()
  clearMealTables()
}

function clearMealTables() {
  $('.allmeals').empty()
}

function clearCheckBoxes() {
  $('*:checkbox').prop('checked', false)
}