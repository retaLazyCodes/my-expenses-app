import modelFunctions from './model.js'
export default {
    drawTotalIncomeAndExpenses: drawTotalIncomeAndExpenses,
    drawCategories: drawCategories
}

const endpointBase = "https://reta-expense-app.herokuapp.com/api/v1/transactions"

async function drawTotalIncomeAndExpenses() {
    if (modelFunctions.thereIsDataStored()) {
        const res = await fetch(`${endpointBase}/total-expense`)
        const json = await res.json()
        const { ingreso, egreso } = json
        const incomeTotalAmount = ingreso[0].TotalIngreso
        const expensesTotalAmount = egreso[0].TotalEgreso

        const currentBalance = incomeTotalAmount - expensesTotalAmount

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
