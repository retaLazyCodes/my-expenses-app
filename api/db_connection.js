const mysql = require('mysql');
const util = require('util')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'den1.mysql2.gear.host',
    user: 'expensesapp',
    password: process.env.DB_PASSWORD,
    database: 'expensesapp'
})

// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'expensesapp'
// })

pool.query = util.promisify(pool.query)

module.exports = pool