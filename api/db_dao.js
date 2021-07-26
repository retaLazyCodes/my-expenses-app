const dayjs = require('dayjs');
const pool = require('./db_connection');
exports.get_all_transactions = get_all_transactions
exports.insert_transaction = insert_transaction
exports.update_transaction = update_transaction
exports.delete_transaction = delete_transaction
exports.get_all_income = get_all_income
exports.get_all_expenses = get_all_expenses
exports.get_total_expenses = get_total_expenses



async function get_all_transactions() {
    try {
        const query = `SELECT type, description, price, category, date, id 
                        FROM expensesapp.transactions `
        const rows = await pool.query(query)
        console.log(rows)
        return JSON.parse(JSON.stringify(rows))
    } catch (error) {
        throw error
    }
}


async function get_all_income() {
    try {
        const query = `SELECT type, description, price, category, date, id
                        FROM transactions WHERE type = 'Ingreso' ORDER BY ABS(id) DESC`
        const rows = await pool.query(query)
        return JSON.parse(JSON.stringify(rows))
    } catch (error) {
        throw error
    }
}


async function get_all_expenses() {
    try {
        const query = `SELECT type, description, price, category, date, id
                        FROM transactions WHERE type = 'Egreso' ORDER BY ABS(id) DESC`
        const rows = await pool.query(query)
        return JSON.parse(JSON.stringify(rows))
    } catch (error) {
        throw error
    }
}

async function get_total_expenses() {
    try {
        const query1 = `SELECT type, price, SUM(price) AS TotalIngreso 
        FROM transactions WHERE type = 'Ingreso';`
        const rows1 = await pool.query(query1)

        const query2 = `SELECT type, price, SUM(price) AS TotalEgreso 
        FROM transactions WHERE type = 'Egreso';`
        const rows2 = await pool.query(query2)

        const obj = { ingreso: rows1, egreso: rows2 }
        return JSON.parse(JSON.stringify(obj))
    } catch (error) {
        throw error
    }
}


function get_insert_transaction_query(transaction) {

    const date_str = transaction['transactionDate']
    console.log("date_str", date_str)
    const splittedDate = date_str.split("/")
    let formatted_date = splittedDate[1] + "/" + splittedDate[0] + "/" + splittedDate[2]
    console.log("formatted_date", formatted_date)
    formatted_date = dayjs(formatted_date).format("YYYY-MM-DD")
    console.log("formatted_dayjs_date", formatted_date)

    const parameters = [transaction['transactionId'],
    transaction['transactionType'],
    transaction['transactionDescription'],
    transaction['transactionCategory'],
    transaction['transactionAmount'],
        formatted_date
    ]
    console.log("parameters", parameters)

    const query = `INSERT INTO transactions (id, type, description, category, price, date) 
    VALUES(${parameters[0]}, 
        '${parameters[1]}',
        '${parameters[2]}',
        '${parameters[3]}',
        ${parameters[4]},
        '${parameters[5]}');`

    return query
}


function insert_transaction(transaction_form_data) {
    try {
        const sql_insert_query = get_insert_transaction_query(transaction_form_data)
        pool.query(sql_insert_query)
    } catch (error) {
        throw error
    }
}


function delete_transaction(id) {
    const delete_transaction_query = `DELETE FROM expensesapp.transactions WHERE id = '${id}'`
    pool.query(delete_transaction_query)
}


function get_update_transaction_query(transaction) {
    const date_str = transaction['transactionDate']
    console.log("date_str", date_str)
    const splittedDate = date_str.split("/")
    let formatted_date = splittedDate[1] + "/" + splittedDate[0] + "/" + splittedDate[2]
    console.log("formatted_date", formatted_date)
    formatted_date = dayjs(formatted_date).format("YYYY-MM-DD")

    const parameters = [
        transaction['transactionDescription'],
        transaction['transactionCategory'],
        transaction['transactionAmount'],
        formatted_date,
        transaction['transactionId']
    ]

    const query = `UPDATE transactions SET 
        description = '${parameters[0]}',
            category = '${parameters[1]}',
            price = ${parameters[2]},
            date = '${parameters[3]}'
        WHERE id = ${parameters[4]}; `

    return query
}


function update_transaction(transaction_form_data) {
    try {
        const sql_update_query = get_update_transaction_query(transaction_form_data)
        pool.query(sql_update_query)
    } catch (error) {
        throw error
    }
}