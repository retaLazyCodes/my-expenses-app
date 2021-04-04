export function getNewTransactionId() {
    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1"
    let newTransactionId = JSON.parse(lastTransactionId) + 1
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
    return newTransactionId
}


export function saveTransactionObj(transactionObj) {
    let transactionArray = []

    if (thereIsDataStored()) {
        transactionArray = JSON.parse(localStorage.getItem("transactionData"))
    }

    transactionArray.push(transactionObj)
    const transactionArrayJson = JSON.stringify(transactionArray)
    localStorage.setItem("transactionData", transactionArrayJson)
}


export function deleteTransactionObj(transactionId) {
    let tranasactionArray = JSON.parse(localStorage.getItem("transactionData"))
    let transactionIndexInArray = tranasactionArray.findIndex(
        element => element.transactionId == transactionId
    )

    tranasactionArray.splice(transactionIndexInArray, 1)

    const transactionArrayJson = JSON.stringify(transactionArray)
    localStorage.setItem("transactionData", transactionArrayJson)
}


function thereIsDataStored() {
    return localStorage.getItem("transactionData") != null
}

