export default {
    getNewTransactionId: getNewTransactionId,
    saveTransactionObj: saveTransactionObj,
    deleteTransactionObj: deleteTransactionObj,
    thereIsDataStored: thereIsDataStored
}


function getNewTransactionId() {
    let lastTransactionId = localStorage.getItem("lastTransactionId") || "-1"
    let newTransactionId = JSON.parse(lastTransactionId) + 1
    localStorage.setItem("lastTransactionId", JSON.stringify(newTransactionId))
    return newTransactionId
}

function saveTransactionObj(transactionObj) {
    let transactionArray = []

    if (thereIsDataStored()) {
        transactionArray = JSON.parse(localStorage.getItem("transactionData"))
    }

    transactionArray.push(transactionObj)
    const transactionArrayJson = JSON.stringify(transactionArray)
    localStorage.setItem("transactionData", transactionArrayJson)
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
    try {
        const storage = JSON.parse(localStorage.getItem("transactionData"))
        return storage != null
    } catch (error) {
        console.error("Not found data in LocalStorage")
        return false
    }
}

