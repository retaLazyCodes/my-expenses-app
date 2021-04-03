document.addEventListener('DOMContentLoaded', () => {
    drawCategories()
})

function drawCategories() {
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

