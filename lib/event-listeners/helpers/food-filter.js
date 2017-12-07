const $ = require('jquery')

const getFilterTermRegExp = () => {
    let term = $("#foodfilter").val()
    return new RegExp(term, "i")
}

const prepareTableForFilter = () => {
    $("table.searchable tr").hide()
    $("th").parents().show()
}

const filterFoods = (regexTerm) => {
    $("table.searchable tr").filter(function() {
        return regexTerm.test($(this).children().text());
    }).show()
}

function applyFilter() {
    let regex = getFilterTermRegExp()
    prepareTableForFilter()
    filterFoods(regex)
}

export { applyFilter }