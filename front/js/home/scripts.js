import viewFunctions from './view.js'
import drawFunctions from './draw.js'

const endpointBase = "http://localhost:8081/api/v1/transactions"

if (screen.width <= 400) {
    hiddenBorderTable()
}

document.addEventListener('DOMContentLoaded', () => {
    getIncomeTransactions()
    getExpensesTransactions()
    drawFunctions.drawCategories()
})


function getIncomeTransactions() {
    fetch(endpointBase + "/income")
        .then(response => response.json())
        .then(json => {
            console.log("income", json)
            if (json.length > 0) {
                viewFunctions.renderNewIncome(json)
                drawFunctions.drawTotalIncomeAndExpenses()
            }
            else {
                viewFunctions.showMessageThereNoIncomeTransactions()
            }
        })
}

function getExpensesTransactions() {
    fetch(endpointBase + "/expenses")
        .then(response => response.json())
        .then(json => {
            console.log("expenses", json)
            if (json.length > 0) {
                viewFunctions.renderNewExpense(json)
                drawFunctions.drawTotalIncomeAndExpenses()
            }
            else {
                viewFunctions.showMessageThereNoExpensesTransactions()
            }
        })
}

function hiddenBorderTable() {
    document.querySelector("#incomeTable").style.borderColor = "#0d0f12"
    document.querySelector("#expensesTable").style.borderColor = "#0d0f12"
}

document.addEventListener('DOMContentLoaded', function () {
    const sidenavs = document.querySelectorAll('.sidenav')
    for (let i = 0; i < sidenavs.length; i++) {
        M.Sidenav.init(sidenavs[i]);
    }

});

