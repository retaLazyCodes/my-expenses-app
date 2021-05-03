const dayjs = require('dayjs');
const pool = require('./db_connection');
exports.get_all_transactions = get_all_transactions
exports.insert_transaction = insert_transaction
exports.update_transaction = update_transaction
exports.delete_transaction = delete_transaction
exports.get_all_income = get_all_income
exports.get_all_expenses = get_all_expenses



async function get_all_transactions() {
    try {
        const query = `SELECT type, description, price, category, date, id 
                        FROM expensesapp.transactions ORDER BY ABS(id) DESC LIMIT 5`
        const rows = await pool.query(query)
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


function get_insert_transaction_query(transaction) {

    const date_str = transaction['transactionDate']
    console.log(date_str)
    const formatted_date = dayjs(date_str).format("YYYY-DD-MM")
    console.log(formatted_date)

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
    console.log(date_str)
    const formatted_date = dayjs(date_str).format("YYYY-DD-MM")
    console.log(formatted_date)

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