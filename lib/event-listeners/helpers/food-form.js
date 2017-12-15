import { Food } from '../../models/food'

export { isValidated, foodFormData, clearFormFields }

const $ = require('jquery')

let foodFormName = $("#name")
let foodFormCals = $("#calories")

function isValidated(newFood) {
    let foodname = newFood.name
    let calories = newFood.calories
    if (foodname === '' || calories === '') {
        return false
    } else {
        return true
    }
}

function foodFormData() {
    return {"name": foodFormName.val(), "calories": foodFormCals.val()}
    // return new Food(foodFormName.val(), foodFormCals.val())
}

function clearFormFields() {
    foodFormName.val("")
    foodFormCals.val("")
}
