import modelFunctions from './model.js'
export default {
    drawTotalIncomeAndExpenses: drawTotalIncomeAndExpenses,
    drawCategories: drawCategories
}

function drawTotalIncomeAndExpenses() {
    if (modelFunctions.thereIsDataStored()) {
        const incomeTable = document.getElementById('incomeTable')
        const tIncomeBodyRowCount = incomeTable.tBodies[0].rows.length;
        const tIncomeBody = document.querySelector(".incomeTableBody")

        let incomeTransactionAmountRows = []
        for (let j = 1; j < tIncomeBodyRowCount; j++) {
            const actualTransactionAmountRow = tIncomeBody.rows[j].cells[2].textContent
            incomeTransactionAmountRows.push(actualTransactionAmountRow)
        }

        const expensesTable = document.getElementById('expensesTable')
        const tExpensesBodyRowCount = expensesTable.tBodies[0].rows.length;
        const tExpensesBody = document.querySelector(".expensesTableBody")

        let expensesTransactionAmountRows = []
        for (let j = 1; j < tExpensesBodyRowCount; j++) {
            const actualTransactionAmountRow = tExpensesBody.rows[j].cells[2].textContent
            expensesTransactionAmountRows.push(actualTransactionAmountRow)
        }


        let incomeTotalAmount = 0
        let expensesTotalAmount = 0
        incomeTransactionAmountRows.forEach(elem => {
            incomeTotalAmount += parseFloat(elem)
        })

        expensesTransactionAmountRows.forEach(elem => {
            expensesTotalAmount += parseFloat(elem)
        })

        let currentBalance = incomeTotalAmount - expensesTotalAmount

        let transactionResults = document.querySelector(".transactionResults")
        transactionResults.rows[0].cells[0].textContent = incomeTotalAmount
        transactionResults.rows[0].cells[1].textContent = expensesTotalAmount
        transactionResults.rows[0].cells[2].textContent = currentBalance
    }
    else {
        let transactionResults = document.querySelector(".transactionResults")
        transactionResults.rows[0].cells[0].textContent = 0
        transactionResults.rows[0].cells[1].textContent = 0
        transactionResults.rows[0].cells[2].textContent = 0
    }

}

function drawCategories() {
    let allCategories = [
        "Bebidas", "Comida", "Diversión", "Educación", "Expensas", "Gasolina", "Higiene", "Hotel", "Mascota", "Mercancía",
        "Otros", "Personales", "Préstamo", "Propinas", "Ropa", "Salud", "Tecnología", "Trabajo", "Transporte",
    ]
    for (let index = 0; index < allCategories.length; index++) {
        insertCategory(allCategories[index])
    }
}


function insertCategory(categoryName) {
    const selectElement = document.getElementById("new_transactionCategory")
    const htmlToInsert = `<option> ${categoryName} </option>`
    selectElement.insertAdjacentHTML("beforeend", htmlToInsert)
}
