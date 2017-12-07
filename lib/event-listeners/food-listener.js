import { Food } from '../models/food'
import { renderFoods } from '../response-handlers/all_food_objects'
import { createFood, deleteFood, updateFood, foodsResponse } from '../ajax-requests/food-requests'
import { appendFood } from '../response-handlers/append-food'
import { sortFoodTable, defaultSort } from '../event-listeners/helpers/food-sort'
import { applyFilter } from '../event-listeners/helpers/food-filter'

export { defaultSort, removeFromFoodsTable }

const $ = require('jquery')

let foodFormName = $("#name")
let foodFormCals = $("#calories")

$("#food_form").on("submit", (event) => {
    event.preventDefault()
    let newFood = foodFormData()
    if (objectHasData(newFood)) {
        clearFormFields()
        createFood(newFood).then((response) => {
            appendFood(response, "#foodlist", "food")
        })
    }
})

const objectHasData = (newFood) => {
    let foodname = newFood.name
    let calories = newFood.calories
    if (foodname === '' || calories === '') {
        return false
    } else {
        return true
    }
}

const foodFormData = () => {
    return new Food(foodFormName.val(), foodFormCals.val())
}

const clearFormFields = () => {
    foodFormName.val("")
    foodFormCals.val("")
}


//delete button functions
$(document).on({
    mouseenter: function() {
        $(this).prop("src", "src/x-button.svg")
    },
    mouseleave: function() {
        $(this).prop("src", "src/delete.svg")
    },
    click: function() {
        let parent = $(this).parents("tr")
        deleteFood(parent.attr('id'))
    }
}, '.food_delete_button')

function removeFromFoodsTable(id) {
    $(`#${id}`).remove()
} 

//edit food functions
$(document).on({
    click: function() {
        $(this).attr('contenteditable', "true")
        $(this).addClass('highlighted')
    },
    blur: function() {
        $(this).removeClass('highlighted')
        let updatedFood = getUpdatedFood($(this))
        updateFood(updatedFood)
    }
}, '.foodinfo')

const getUpdatedFood = (element) => {
    $(element).attr('contenteditable', "false")
    let row = $(element).parent()
    let id = row.attr('id')
    let name = row.find('.name').text()
    let calories = row.find('.calories').text()
    return new Food(name, calories, id)
}

//filter
$("#foodfilter").on('keyup', () => {
    applyFilter()
})

// sort
$('.searchable thead').on({
    click: function() {
        let table = $(this).parents('table')
        sortFoodTable(table)
    }
}, '#calorie-header')
