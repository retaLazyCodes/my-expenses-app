import modelFunctions from './model.js'
export default {
    drawCategories: drawCategories,
    drawSpanishDatepicker: drawSpanishDatepicker,
    drawTotalIncomeAndExpenses: drawTotalIncomeAndExpenses
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
    const selectElement = document.getElementById("transactionCategory")
    const htmlToInsert = `<option> ${categoryName} </option>`
    selectElement.insertAdjacentHTML("beforeend", htmlToInsert)
}


function drawSpanishDatepicker() {
    const calendar = document.querySelector('.datepicker')
    M.Datepicker.init(calendar, {
        format: 'dd/mm/yy',
        autoClose: true,
        firstDay: 1,
        i18n: {
            months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
            monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
            weekdays: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
            weekdaysShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
            weekdaysAbbrev: ["D", "L", "M", "M", "J", "V", "S"]
        }
    })
    document.querySelector('.datepicker-date-display').style.backgroundColor = "DeepPink"
}