// import { Food } from '../../models/food'
const Food = require('../../models/food')

export { removeFromFoodsTable, getUpdatedFood }

const $ = require('jquery')

function removeFromFoodsTable(id) {
    $(`#${id}`).remove()
}

function getUpdatedFood(element) {
    $(element).attr('contenteditable', "false")
    let row = $(element).parent()
    let id = row.attr('id')
    let name = row.find('.name').text()
    let calories = row.find('.calories').text()
    return {"name": name, "calories": calories, "id": id}
}
