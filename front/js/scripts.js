import viewFunctions from './view.js'
import modelFunctions from './model.js'

let transactions = ""
const endpointBase = "http://127.0.0.1:3050/api/v1/transactions"

if (screen.width <= 400) {
    hiddenBorderTable()
}

document.addEventListener('DOMContentLoaded', () => {
    getInitial()
    viewFunctions.drawCategories()
    viewFunctions.drawSpanishDatepicker()
    setTimeout(viewFunctions.drawTotalIncomeAndExpenses, 3000)
})


const form = document.getElementById("transactionForm")


form.addEventListener("submit", (event) => {
    event.preventDefault()
    const transactionFormData = new FormData(form)
    transactionFormData.append("transactionId", modelFunctions.getNewTransactionId());
    modelFunctions.saveTransactionFormData(transactionFormData)

    const transactionObj = convertFormDataToTransactionObj(transactionFormData)
    viewFunctions.insertRowInTransactionTable(transactionObj)
    setTimeout(viewFunctions.drawTotalIncomeAndExpenses, 3000)
    form.reset()

})


function getInitial() {
    fetch(endpointBase + "/initial")
        .then(response => response.json())
        .then(json => {
            transactions = json
            viewFunctions.renderNewSelection(transactions)
        })
}


function convertFormDataToTransactionObj(transactionFormData) {
    const transactionType = transactionFormData.get('transactionType')
    const transactionDescription = transactionFormData.get('transactionDescription')
    const transactionAmount = transactionFormData.get('transactionAmount')
    const transactionCategory = transactionFormData.get('transactionCategory')
    const transactionDate = transactionFormData.get('transactionDate')
    const transactionId = transactionFormData.get('transactionId')
    return {
        "transactionType": transactionType,
        "transactionDescription": transactionDescription,
        "transactionAmount": transactionAmount,
        "transactionCategory": transactionCategory,
        "transactionDate": transactionDate,
        "transactionId": transactionId
    }
}


function hiddenBorderTable() {
    document.querySelector("#transactionTable").style.borderColor = "#0d0f12"


}

