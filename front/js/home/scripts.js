import viewFunctions from './view.js'
import drawFunctions from './draw.js'

const endpointBase = "https://reta-expenses-node-app.herokuapp.com/api/v1/transactions"

if (screen.width <= 400) {
    hiddenBorderTable()
}

document.addEventListener('DOMContentLoaded', () => {
    getIncomeTransactions()
    getExpensesTransactions()
})


function getIncomeTransactions() {
    fetch(endpointBase + "/income")
        .then(response => response.json())
        .then(json => {
            console.log("income", json)
            viewFunctions.renderNewIncome(json)
            drawFunctions.drawTotalIncomeAndExpenses()
        })
}

function getExpensesTransactions() {
    fetch(endpointBase + "/expenses")
        .then(response => response.json())
        .then(json => {
            viewFunctions.renderNewExpense(json)
            drawFunctions.drawTotalIncomeAndExpenses()
        })
}

function hiddenBorderTable() {
    document.querySelector("#ingressTable").style.borderColor = "#0d0f12"
}

document.addEventListener('DOMContentLoaded', function () {
    const sidenavs = document.querySelectorAll('.sidenav')
    for (let i = 0; i < sidenavs.length; i++) {
        M.Sidenav.init(sidenavs[i]);
    }

});

