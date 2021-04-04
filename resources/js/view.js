import { deleteTransactionObj } from './model'


export function drawCategories() {
    let allCategories = [
        "Comida", "Expensas", "Ocio", "Higiene", "Tecnología", "Trabajo", "Transporte"
    ]
    for (let index = 0; index < allCategories.length; index++) {
        insertCategory(allCategories[index])
    }
}


function insertCategory(categoryName) {
    const selectElement = document.getElementById("transactionCategory")
    const htmlToInsert = `<option> ${categoryName} </option>`
    selectElement.insertAdjacentHTML("beforeend", htmlToInsert)
}


export function insertRowInTransactionTable(transactionObj) {
    const transactionTableRef = document.getElementById('transactionTable')

    const newTransactionRowRef = transactionTableRef.insertRow(-1)
    newTransactionRowRef.setAttribute("data-transaction-id", transactionObj.transactionId)

    const transactionKeys = Object.keys(transactionObj)
    const transactionIdIndex = transactionKeys.indexOf('transactionId')
    let newTypeCellRef
    let i = 0
    for (prop in transactionObj) {
        if (prop == transactionKeys[transactionIdIndex]) {
            continue
        }
        newTypeCellRef = newTransactionRowRef.insertCell(i)
        newTypeCellRef.textContent = transactionObj[prop]
        i++
    }
    let newDeleteCell = newTransactionRowRef.insertCell(i)
    let deleteButton = document.createElement("button")
    deleteButton.textContent = "Eliminar"
    newDeleteCell.appendChild(deleteButton)

    deleteButton.addEventListener('click', (event) => {
        const transactionRow = event.target.parentNode.parentNode
        const transactionId = transactionRow.getAttribute("data-transaction-id")
        transactionRow.remove()
        deleteTransactionObj(transactionId)
    })

}



