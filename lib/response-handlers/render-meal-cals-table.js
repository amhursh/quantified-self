import { sumCalories, getCalories } from '../response-handlers/render-total-cals-table.js'

export { renderAllCals }

const $ = require('jquery')

// render total calories
const renderTotalCals = (name) => {
    let tableCalories = getCalories(name)
    let totalCalories = sumCalories(tableCalories)
    $(`#${name}-calories`).text(totalCalories)
}

// render remaining cals
const renderRemainCals = (name) => {
    let remainCals = getRemainCals(name)
    $(`#${name}-remaining`).text(remainCals)
}

const getRemainCals = (name) => {
    let total = parseInt($(`#${name}-calories`).text())
    let goalValues = {"Snack": (200 - total), "Breakfast": (400 - total), "Lunch": (600 - total), "Dinner":(800 - total)}
    return goalValues[name]
}

//render all Calories
function renderAllCals(name) {
    renderTotalCals(name)
    renderRemainCals(name)
    colorizeCals()
}

const colorizeCals = () => {
    $(`td.remaining-calories:contains('-')`).addClass('red').removeClass('green')
    $(`td.remaining-calories:not(:contains('-'))`).addClass('green').removeClass('red')
}
