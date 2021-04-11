import modelFunctions from './model.js'
export default {
    renderNewSelection: renderNewSelection,
    drawCategories: drawCategories,
    drawSpanishDatepicker: drawSpanishDatepicker,
    drawTotalIncomeAndExpenses: drawTotalIncomeAndExpenses,
    insertRowInTransactionTable: insertRowInTransactionTable
}

function renderNewSelection(transactions) {
    const transactionArray = JSON.parse(JSON.stringify(transactions))
    transactionArray.forEach(element => insertRowInTransactionTable(element))

}

function drawCategories() {
    let allCategories = [
        "Bebidas", "Comida", "Diversión", "Educación", "Expensas", "Gasolina", "Higiene", "Hotel", "Mascota", "Mercancía",
        "Otros", "Personales", "Préstamo", "Propinas", "Ropa", "Salud", "Tecnología", "Trabajo", "Transporte",
    ]
    for (let index = 0; index < allCategories.length; index++) {
        insertCategory(allCategories[index])
    }
}


function insertCategory(categoryName) {
    const selectElement = document.getElementById("transactionCategory")
    const htmlToInsert = `<option> ${categoryName} </option>`
    selectElement.insertAdjacentHTML("beforeend", htmlToInsert)
}


function insertRowInTransactionTable(transactionObj) {
    const transactionTableRef = document.getElementById('transactionTable')
    const newTransactionRowRef = transactionTableRef.insertRow(-1)
    const transactionId = Object.values(transactionObj)[5]
    newTransactionRowRef.setAttribute("data-transaction-id", transactionId)
    transactionObj["date"] = moment(transactionObj["date"]).format("DD/MM/YY")
    const transactionKeys = Object.keys(transactionObj)

    const transactionIdIndex = transactionKeys.indexOf('id')
    let newTypeCellRef
    let i = 0
    for (const prop in transactionObj) {
        if (prop == transactionKeys[transactionIdIndex] ||
            prop == "transactionId" ||
            prop == "transactionDate") {
            continue
        }
        newTypeCellRef = newTransactionRowRef.insertCell(i)
        newTypeCellRef.textContent = transactionObj[prop]
        i++
    }
    let newDeleteCell = newTransactionRowRef.insertCell(i)
    let deleteButton = document.createElement("button")
    deleteButton.classList.add("waves-effect");
    deleteButton.classList.add("waves-light");
    deleteButton.classList.add("btn-small");
    deleteButton.textContent = "Eliminar"
    deleteButton.insertAdjacentHTML("beforeend", '<i class="material-icons left">delete</i>')
    newDeleteCell.appendChild(deleteButton)

    deleteButton.addEventListener('click', (event) => {
        const transactionRow = event.target.parentNode.parentNode
        const transactionId = transactionRow.getAttribute("data-transaction-id")
        transactionRow.remove()
        modelFunctions.deleteTransactionObj(transactionId)
    })

}


function drawTotalIncomeAndExpenses() {
    if (modelFunctions.thereIsDataStored()) {
        const table = document.getElementById('transactionTable')
        const tbodyRowCount = table.tBodies[0].rows.length;
        const tbody = document.querySelector(".transactionTableBody")

        let incomeTransactionAmountRows = []
        let expensesTransactionAmountRows = []
        for (let j = 1; j < tbodyRowCount; j++) {
            const actualTransactionAmountRow = tbody.rows[j].cells[2].textContent
            const actualTransactionCategoryRow = tbody.rows[j].cells[0].textContent

            if (actualTransactionCategoryRow == "Ingreso") {
                incomeTransactionAmountRows.push(actualTransactionAmountRow)
            }
            else {
                expensesTransactionAmountRows.push(actualTransactionAmountRow)
            }
        }

        let incomeTotalAmount = 0
        let expensesTotalAmount = 0
        incomeTransactionAmountRows.forEach(elem => {
            incomeTotalAmount += parseFloat(elem)
        })

        expensesTransactionAmountRows.forEach(elem => {
            expensesTotalAmount += parseFloat(elem)
        })

        let currentBalance = incomeTotalAmount - expensesTotalAmount

        let transactionResults = document.querySelector(".transactionResults")
        transactionResults.rows[0].cells[0].textContent = incomeTotalAmount
        transactionResults.rows[0].cells[1].textContent = expensesTotalAmount
        transactionResults.rows[0].cells[2].textContent = currentBalance
    }
    else {
        let transactionResults = document.querySelector(".transactionResults")
        transactionResults.rows[0].cells[0].textContent = 0
        transactionResults.rows[0].cells[1].textContent = 0
        transactionResults.rows[0].cells[2].textContent = 0
    }

}


function drawSpanishDatepicker() {
    const calendar = document.querySelector('.datepicker')
    M.Datepicker.init(calendar, {
        format: 'dd/mm/yy',
        autoClose: true,
        firstDay: 1,
        i18n: {
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
            weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"]
        }
    })
    document.querySelector('.datepicker-date-display').style.backgroundColor = "DeepPink"
}




