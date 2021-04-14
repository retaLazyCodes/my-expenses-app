import viewFunctions from './view.js'
import drawFunctions from './draw.js'
import modelFunctions from './model.js'

const endpointBase = "http://127.0.0.1:3050/api/v1/transactions"

if (screen.width <= 400) {
    hiddenBorderTable()
}

document.addEventListener('DOMContentLoaded', () => {
    getTransactions()
    drawFunctions.drawCategories()
    drawFunctions.drawSpanishDatepicker()
})


const form = document.getElementById("transactionForm")


form.addEventListener("submit", (event) => {
    event.preventDefault()
    const transactionFormData = new FormData(form)
    transactionFormData.append("transactionId", modelFunctions.getNewTransactionId());
    modelFunctions.saveTransaction(transactionFormData)
    form.reset()

})


function getTransactions() {
    fetch(endpointBase + "/initial")
        .then(response => response.json())
        .then(json => {
            viewFunctions.renderNewSelection(json)
            drawFunctions.drawTotalIncomeAndExpenses()
        })
}


function hiddenBorderTable() {
    document.querySelector("#transactionTable").style.borderColor = "#0d0f12"
}
