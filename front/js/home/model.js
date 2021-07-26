import viewFunctions from './view.js'
import drawFunctions from './draw.js'

export default {
    getNewTransactionId: getNewTransactionId,
    deleteTransaction: deleteTransaction,
    thereIsDataStored: thereIsDataStored,
    updateTransaction: updateTransaction
}

const endpointBase = "https://reta-expense-app.herokuapp.com/api/v1/transactions"

function getNewTransactionId() {
    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1"
    let newTransactionId = JSON.parse(lastTransactionId) + 1
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
    return newTransactionId
}


function thereIsDataStored() {
    return localStorage.getItem("lastTransactionId") != null
        || fetch(`${endpointBase}/initial`)
            .then(res => res.json())
            .then(json?.length > 0)
}


function deleteLastTransactionId() {
    let lastTransactionId = localStorage.getItem("lastTransactionId")
    let newTransactionId = JSON.parse(lastTransactionId) - 1
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
}


function deleteTransaction(transactionId) {
    fetch(endpointBase + "/delete/" + transactionId, {
        method: "DELETE",
    })
        .then(drawFunctions.drawTotalIncomeAndExpenses())
        .then(deleteLastTransactionId())
}


function updateTransaction(transactionFormData) {
    const transactionObj = convertFormDataToTransactionObj(transactionFormData)
    console.log("AAAA", transactionFormData)
    console.log("AAAA", transactionObj)
    fetch(endpointBase + "/update", {
        method: "PUT",
        body: transactionFormData
    })
        .then(viewFunctions.updateRowInTransactionTable(transactionObj))
        .then(drawFunctions.drawTotalIncomeAndExpenses())
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