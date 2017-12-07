const $ = require('jquery')

const sortTableAscending = (table) => {
    let sortableRows = table.children('tr')
    let sortedRows = sortableRows.sort((a, b) => {
        let valueA = parseInt($(a).children('td.calories').text())
        let valueB = parseInt($(b).children('td.calories').text())
        return (valueA < valueB) ? -1 : (valueA > valueB) ? 1 : 0;
    })
    sortableRows.remove()
    $(table).append(sortedRows).addClass('asc').removeClass('alphabetical')
}

const sortTableDescending = (table) => {
    let sortableRows = table.children('tr')
    let sortedRows = sortableRows.sort((a, b) => {
        let valueA = parseInt($(a).children('td.calories').text())
        let valueB = parseInt($(b).children('td.calories').text())
        return (valueA > valueB) ? -1 : (valueA < valueB) ? 1 : 0;
    })
    sortableRows.remove()
    $(table).append(sortedRows).addClass('desc').removeClass('asc')
}

function defaultSort(table) {
    let sortableRows = table.children('tr')
    let sortedRows = sortableRows.sort((a, b) => {
        let valueA = $(a).children('td.name').text()
        let valueB = $(b).children('td.name').text()
        return (valueA.toUpperCase() < valueB.toUpperCase()) ? -1 : (valueA.toUpperCase() > valueB.toUpperCase()) ? 1 : 0;
    })
    sortableRows.remove()
    $(table).append(sortedRows).addClass('alphabetical').removeClass('desc')
}

const sortFoodTable = (table) => {
  if (table.hasClass('alphabetical'))
    return sortTableAscending(table)
  else if (table.hasClass('asc'))
    return sortTableDescending(table)
  else if (table.hasClass('desc'))
    return defaultSort(table)
}

export { sortFoodTable, defaultSort }