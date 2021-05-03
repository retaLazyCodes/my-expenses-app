import viewFunctions from './view.js'
import drawFunctions from './draw.js'
import modelFunctions from './model.js'

const endpointBase = "http://127.0.0.1:8081/api/v1/transactions"

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
    setLastTransactionId()
    const transactionFormData = new FormData(form)
    transactionFormData.append("transactionId", modelFunctions.getNewTransactionId());
    modelFunctions.saveTransaction(transactionFormData)
    viewFunctions.showTable()
    form.reset()

})


const updateForm = document.getElementById("updateTransactionForm")


updateForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const transactionFormData = new FormData(updateForm)
    const transactionId = updateForm.getAttribute("data-transaction-id")
    transactionFormData.append("transactionId", transactionId);
    modelFunctions.updateTransaction(transactionFormData)
    updateForm.reset()

})


function getTransactions() {
    fetch(endpointBase + "/initial")
        .then(response => response.json())
        .then(json => {
            if (json.length > 0) {
                viewFunctions.renderNewSelection(json)
                drawFunctions.drawTotalIncomeAndExpenses()
            }
            else {
                viewFunctions.showMessageThereNoTransactions()
            }
        })
}


function hiddenBorderTable() {
    document.querySelector("#transactionTable").style.borderColor = "#0d0f12"
}


function setLastTransactionId() {

    console.log("hola")
    let lastTransactionId = localStorage.getItem("lastTransactionId")
    const transactionTable = document.getElementById("transactionTable")
    lastTransactionId = transactionTable.rows.length - 3
    localStorage.setItem("lastTransactionId", JSON.stringify(lastTransactionId))
}


document.addEventListener('DOMContentLoaded', function () {
    const sidenavs = document.querySelectorAll('.sidenav')
    for (let i = 0; i < sidenavs.length; i++) {
        M.Sidenav.init(sidenavs[i]);
    }

});

