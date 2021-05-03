import modelFunctions from './model.js'
export default {
    renderNewSelection: renderNewSelection,
    insertRowInTransactionTable: insertRowInTransactionTable,
    updateRowInTransactionTable: updateRowInTransactionTable
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
        insertEditButton(newTransactionRowRef, i + 1)
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
    insertEditButton(newTransactionRowRef, i + 1)
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


function insertEditButton(newTransactionRowRef, deleteCellIndex) {
    let newDeleteCell = newTransactionRowRef.insertCell(deleteCellIndex)
    let editButton = document.createElement("button")
    editButton.classList.add("modal-btn")
    editButton.classList.add("waves-effect");
    editButton.classList.add("waves-light");
    editButton.classList.add("btn-small");
    editButton.textContent = "Editar"
    editButton.insertAdjacentHTML("beforeend", '<i class="material-icons left">edit</i>')
    newDeleteCell.appendChild(editButton)

    editButton.addEventListener('click', (event) => {
        // Showing Modal
        const modalBg = document.querySelector(".modal-bg")
        const modalClose = document.querySelector(".edit-modal-close")

        modalBg.classList.add("bg-active")

        modalClose.addEventListener("click", () => {
            modalBg.classList.remove("bg-active")
        })

        // Loading current Date on modal
        // const table = document.getElementById("transactionTable")
        // const transactionRow = event.target.parentNode.parentNode
        // console.log("transactionRow: ", transactionRow)
        // const transactionId = parseInt(transactionRow.dataset["transactionId"])
        // console.log("transactionId: ", transactionId)
        // const currentTransactionDate = table.tBodies[0].rows[transactionId + 1].cells[4].textContent
        // console.log("currentDate", currentTransactionDate)

        // const modalDate = document.getElementById("new_transactionDate")
        // console.log(modalDate)
        // modalDate.value = currentTransactionDate


        // const updateTransactionForm = document.getElementById("updateTransactionForm")
        // updateTransactionForm.setAttribute("data-transaction-id", transactionId)
        // console.log("updateTransactionForm", updateTransactionForm)


        // // Loading Desc on modal
        // const currentTransactionDesc = table.tBodies[0].rows[transactionId + 1].cells[1].textContent
        // const modalDesc = document.getElementById("new_transactionDescription")
        // console.log(modalDesc)
        // modalDesc.value = currentTransactionDesc
        // modalDesc.focus()


        // // Loading Price on modal
        // const currentTransactionAmount = table.tBodies[0].rows[transactionId + 1].cells[2].textContent
        // const modalAmount = document.getElementById("new_transactionAmount")
        // console.log(modalAmount)
        // modalAmount.value = currentTransactionAmount
        // modalAmount.focus()

        // // Loading all categories on the modal
        // const categories = document.getElementById("transactionCategory")
        // const modalCategories = document.getElementById("new_transactionCategory")
        // modalCategories.innerHTML = categories.innerHTML
        // modalCategories.value = table.tBodies[0].rows[transactionId + 1].cells[3].textContent


        // Sending data to API
        const transactionUpdate = document.getElementById("transactionUpdate")

        transactionUpdate.addEventListener("click", () => {
            modalBg.classList.remove("bg-active")
            modelFunctions.updateTransaction(transactionId)
        })
    })
}


function updateRowInTransactionTable(transactionObj) {
    const transactionTableRef = document.getElementById('transactionTable')
    const transactionId = parseInt(Object.values(transactionObj)[5])
    const newTransactionRowRef = transactionTableRef.rows[transactionId + 2]

    console.log("Este es mi id", transactionId)
    console.log(newTransactionRowRef)
    console.log("objeto-- ", transactionObj)

    let newTypeCellRef
    let i = 1
    for (const prop in transactionObj) {
        if (prop == "transactionId" ||
            prop == "transactionType") {
            continue
        }
        newTypeCellRef = newTransactionRowRef.cells[i]
        console.log(newTypeCellRef)
        newTypeCellRef.textContent = transactionObj[prop]
        i++
    }

}





