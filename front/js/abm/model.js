import viewFunctions from './view.js'
import drawFunctions from './draw.js'


export default {
    getNewTransactionId: getNewTransactionId,
    deleteTransaction: deleteTransaction,
    thereIsDataStored: thereIsDataStored,
    saveTransaction: saveTransaction,
    updateTransaction: updateTransaction
}

const endpointBase = "http://localhost:8081/api/v1/transactions"

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
    if (!isNaN(parseFloat(transactionId)) && isFinite(transactionId)) {
        fetch(endpointBase + "/delete/" + transactionId, {
            method: "DELETE",
        })
            .then(response => {
                if (response.status === 200) {
                    showSuccessMsg()
                    drawFunctions.drawTotalIncomeAndExpenses()
                    deleteLastTransactionId()
                }
                else
                    showErrorMsg("Error in the Server")
            })
    }
}


function saveTransaction(transactionFormData) {
    const transactionObj = convertFormDataToTransactionObj(transactionFormData)
    const result = isValidTransaction(transactionObj)
    if (isValidTransaction(transactionObj) == true) {
        fetch(endpointBase + "/save", {
            method: "POST",
            body: transactionFormData
        })
            .then(response => {
                if (response.status === 200) {
                    showSuccessMsg()
                    viewFunctions.insertRowInTransactionTable(transactionObj)
                    drawFunctions.drawTotalIncomeAndExpenses()
                }
                else
                    showErrorMsg("Error in the Server")
            })
    }
    else {
        showErrorMsg(result)
    }
}


function updateTransaction(transactionFormData) {
    const transactionObj = convertFormDataToTransactionObj(transactionFormData)
    const result = isValidTransaction(transactionObj)
    if (isValidTransaction(transactionObj) == true) {
        fetch(endpointBase + "/update", {
            method: "PUT",
            body: transactionFormData
        })
            .then(response => {
                if (response.status === 200) {
                    showSuccessMsg()
                    viewFunctions.updateRowInTransactionTable(transactionObj)
                    drawFunctions.drawTotalIncomeAndExpenses()
                }
                else
                    showErrorMsg("Error in the Server")
            })
    }
    else {
        showErrorMsg(result)
    }
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


function isValidTransaction(transactionObj) {
    const values = Object.values(transactionObj)
    console.log(values)
    if (values[1] == "" || values[1].length < 2)
        return "Invalid Transaction description"

    if (!(!isNaN(parseFloat(values[2])) && isFinite(values[2])))
        return "Invalid Price"

    if (!isValidCategory(values[3]))
        return "Invalid Category"

    if (!isValidDateFormat(values[4])) {
        return "Invalid Date Format"
    }
    return true
}

function isValidDateFormat(inputDate) {
    const splittedDate = inputDate.split("/")
    let formattedDate = splittedDate[1] + "/" + splittedDate[0] + "/" + splittedDate[2]
    formattedDate = dayjs(formattedDate).format("YYYY-MM-DD")
    return dayjs().isValid(formattedDate)
}


function isValidCategory(inputCategory) {
    const allCategories = [
        "Bebidas", "Comida", "Diversión", "Educación", "Expensas", "Gasolina", "Higiene", "Hotel", "Mascota", "Mercancía",
        "Otros", "Personales", "Préstamo", "Propinas", "Ropa", "Salud", "Tecnología", "Trabajo", "Transporte",
    ]
    const result = allCategories.filter(category => category == inputCategory)
    return result.length > 0
}


function showSuccessMsg() {
    M.toast({ html: "Transaction Successful" })
    const css = document.querySelector('.toast')
    css.style.backgroundColor = '#26A69A'
}

function showErrorMsg(result) {
    M.toast({ html: `${result}` })
    const css = document.querySelector('.toast')
    css.style.backgroundColor = '#f05945'
}