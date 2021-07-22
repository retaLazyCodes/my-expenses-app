const mysql = require('mysql');
const bd_connect = require('./db_pass');
const util = require('util')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'den1.mysql2.gear.host',
    user: 'expensesapp',
    password: bd_connect.password,
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