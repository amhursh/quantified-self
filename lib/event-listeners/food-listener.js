import { Food } from '../models/food'
import { renderFoods } from '../response-handlers/all_food_objects'
import { createFood, deleteFood, updateFood, foodsResponse } from '../ajax-requests/food-requests'
import { appendFood } from '../response-handlers/append-food'
import { sortFoodTable, defaultSort } from '../event-listeners/helpers/food-sort'
import { applyFilter } from '../event-listeners/helpers/food-filter'
import { isValidated, foodFormData, clearFormFields } from '../event-listeners/helpers/food-form'
import { getUpdatedFood, removeFromFoodsTable } from '../event-listeners/helpers/food-misc'

export { removeFromFoodsTable }

const $ = require('jquery')

$("#food_form").on("submit", (event) => {
    event.preventDefault()
    let newFood = foodFormData()
    if (isValidated(newFood)) {
        clearFormFields()
        createFood(newFood).then((response) => {
            appendFood(response, "#foodlist", "food")
        })
    }
})

//delete button functions
$('.list').on({
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


//edit food functions
$('.list').on({
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
