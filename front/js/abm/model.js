import viewFunctions from './view.js'
import drawFunctions from './draw.js'

export default {
    getNewTransactionId: getNewTransactionId,
    deleteTransaction: deleteTransaction,
    thereIsDataStored: thereIsDataStored,
    saveTransaction: saveTransaction,
    updateTransaction: updateTransaction
}

const endpointBase = "http://127.0.0.1:8081/api/v1/transactions"

function getNewTransactionId() {
    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1"
    let newTransactionId = JSON.parse(lastTransactionId) + 1
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
    return newTransactionId
}


function thereIsDataStored() {
    return localStorage.getItem("lastTransactionId") != null
}


function deleteLastTransactionId() {
    let lastTransactionId = localStorage.getItem("lastTransactionId")
    let newTransactionId = JSON.parse(lastTransactionId) - 1
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
}


function deleteTransaction(transactionId) {
    fetch(endpointBase + "/delete/" + transactionId, {
        method: "POST",
    })
        .then(drawFunctions.drawTotalIncomeAndExpenses())
        .then(deleteLastTransactionId())
}


function saveTransaction(transactionFormData) {
    const transactionObj = convertFormDataToTransactionObj(transactionFormData)

    fetch(endpointBase + "/save", {
        method: "POST",
        body: transactionFormData
    })
        .then(viewFunctions.insertRowInTransactionTable(transactionObj))
        .then(drawFunctions.drawTotalIncomeAndExpenses())
}


function updateTransaction(transactionFormData) {
    const transactionObj = convertFormDataToTransactionObj(transactionFormData)
    console.log("AAAA", transactionFormData)
    console.log("AAAA", transactionObj)
    fetch(endpointBase + "/update", {
        method: "POST",
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