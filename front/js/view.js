import modelFunctions from './model.js'
export default {
    renderNewSelection: renderNewSelection,
    insertRowInTransactionTable: insertRowInTransactionTable,
}

function renderNewSelection(transactions) {
    const transactionArray = JSON.parse(JSON.stringify(transactions))
    transactionArray.forEach(element => insertRowInTransactionTable(element))

}


function insertRowInTransactionTable(transactionObj) {
    const transactionTableRef = document.getElementById('transactionTable')
    const newTransactionRowRef = transactionTableRef.insertRow(-1)
    const transactionId = Object.values(transactionObj)[5]
    newTransactionRowRef.setAttribute("data-transaction-id", transactionId)

    if (transactionObj.hasOwnProperty("date")) {
        transactionObj["date"] = dayjs(transactionObj["date"]).format("DD/MM/YY")
        insertCellInTransactionRow(newTransactionRowRef, transactionObj)
    }
    else {
        console.log(transactionObj)
        let newTypeCellRef
        let i = 0
        for (const prop in transactionObj) {
            if (prop == "transactionId") {
                continue
            }
            newTypeCellRef = newTransactionRowRef.insertCell(i)
            newTypeCellRef.textContent = transactionObj[prop]
            i++
        }
        insertDeleteButton(newTransactionRowRef, i)
    }
}


function insertCellInTransactionRow(newTransactionRowRef, transactionObj) {
    const transactionKeys = Object.keys(transactionObj)
    const transactionIdIndex = transactionKeys.indexOf('id')
    let newTypeCellRef
    let i = 0
    console.log(transactionObj)
    for (const prop in transactionObj) {
        if (prop == transactionKeys[transactionIdIndex]) {
            continue
        }
        newTypeCellRef = newTransactionRowRef.insertCell(i)
        newTypeCellRef.textContent = transactionObj[prop]
        i++
    }
    insertDeleteButton(newTransactionRowRef, i)
}


function insertDeleteButton(newTransactionRowRef, deleteCellIndex) {
    let newDeleteCell = newTransactionRowRef.insertCell(deleteCellIndex)
    let deleteButton = document.createElement("button")
    deleteButton.classList.add("waves-effect");
    deleteButton.classList.add("waves-light");
    deleteButton.classList.add("btn-small");
    deleteButton.textContent = "Eliminar"
    deleteButton.insertAdjacentHTML("beforeend", '<i class="material-icons left">delete</i>')
    newDeleteCell.appendChild(deleteButton)

    deleteButton.addEventListener('click', (event) => {
        const transactionRow = event.target.parentNode.parentNode
        const transactionId = transactionRow.getAttribute("data-transaction-id")
        transactionRow.remove()
        modelFunctions.deleteTransaction(transactionId)
    })
}






