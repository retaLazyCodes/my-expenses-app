import viewFunctions from './view.js'
import modelFunctions from './model.js'


document.addEventListener('DOMContentLoaded', () => {
    viewFunctions.drawCategories()
    viewFunctions.drawSpanishDatepicker()
    if (modelFunctions.thereIsDataStored()) {
        const transactionArray = JSON.parse(localStorage.getItem("transactionData"))
        transactionArray.forEach(element => viewFunctions.insertRowInTransactionTable(element))
    }
})


const form = document.getElementById('transactionForm')


form.addEventListener('submit', (event) => {
    event.preventDefault()
    const transactionFormData = new FormData(form)
    const transactionObj = convertFormDataToTransactionObj(transactionFormData)

    modelFunctions.saveTransactionObj(transactionObj)
    viewFunctions.insertRowInTransactionTable(transactionObj)
    form.reset()

})


function convertFormDataToTransactionObj(transactionFormData) {
    const transactionType = transactionFormData.get('transactionType')
    const transactionDescription = transactionFormData.get('transactionDescription')
    const transactionAmount = transactionFormData.get('transactionAmount')
    const transactionCategory = transactionFormData.get('transactionCategory')
    const transactionDate = transactionFormData.get('transactionDate')
    const transactionId = modelFunctions.getNewTransactionId()
    return {
        "transactionType": transactionType,
        "transactionDescription": transactionDescription,
        "transactionAmount": transactionAmount,
        "transactionCategory": transactionCategory,
        "transactionDate": transactionDate,
        "transactionId": transactionId
    }
}


