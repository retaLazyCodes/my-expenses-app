export default {
    getNewTransactionId: getNewTransactionId,
    deleteTransactionObj: deleteTransactionObj,
    thereIsDataStored: thereIsDataStored,
    saveTransactionFormData: saveTransactionFormData
}

const endpointBase = "http://127.0.0.1:3050/api/v1/transactions"

function getNewTransactionId() {
    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1"
    let newTransactionId = JSON.parse(lastTransactionId) + 1
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
    return newTransactionId
}

function deleteTransactionObj(transactionId) {
    let transactionArray = JSON.parse(localStorage.getItem("transactionData"))
    let transactionIndexInArray = transactionArray.findIndex(
        element => element.transactionId == transactionId
    )

    transactionArray.splice(transactionIndexInArray, 1)

    const transactionArrayJson = JSON.stringify(transactionArray)
    localStorage.setItem("transactionData", transactionArrayJson)
}


function thereIsDataStored() {
    return localStorage.getItem("lastTransactionId") != null
}


function saveTransactionFormData(transactionFormData) {
    const endpoint = endpointBase + "/save"
    let req = new XMLHttpRequest()
    req.open("POST", endpoint)
    req.send(transactionFormData)

}
