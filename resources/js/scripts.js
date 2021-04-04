import { drawCategories, insertRowInTransactionTable } from './view'
import { getNewTransactionId, saveTransactionObj } from './model'


document.addEventListener('DOMContentLoaded', () => {
    drawCategories()
    transactionArray = JSON.parse(localStorage.getItem("transactionData"))
    transactionArray.forEach(element => insertRowInTransactionTable(element))
})


const form = document.getElementById('transactionForm')


form.addEventListener('submit', (event) => {
    event.preventDefault()
    const transactionFormData = new FormData(form)
    const transactionObj = convertFormDataToTransactionObj(transactionFormData)

    saveTransactionObj(transactionObj)
    insertRowInTransactionTable(transactionObj)
    form.reset()

})


function convertFormDataToTransactionObj(transactionFormData) {
    const transactionType = transactionFormData.get('transactionType')
    const transactionDescription = transactionFormData.get('transactionDescription')
    const transactionAmount = transactionFormData.get('transactionAmount')
    const transactionCategory = transactionFormData.get('transactionCategory')
    const transactionId = getNewTransactionId()
    return {
        "transactionType": transactionType,
        "transactionDescription": transactionDescription,
        "transactionAmount": transactionAmount,
        "transactionCategory": transactionCategory,
        "transactionId": transactionId
    }
}


