const db_dao = require('./db_dao')
const cors = require('cors')
const express = require('express')
const multer = require('multer')
const upload = multer()
const app = express()
app.use(cors())
app.options('*', cors())

app.get('/', function (req, res) {
    res.send('Hello Node')
})


app.get('/api/v1/transactions/initial', async function (req, res) {
    try {
        const all_transactions = await db_dao.get_all_transactions()
        console.log("rows", all_transactions)
        res.status(200).send(JSON.stringify(all_transactions))
    } catch (error) {
        console.log(error.message)
        res.status(400).send({ "Error": e.message })
    }
})


app.get('/api/v1/transactions/income', async function (req, res) {
    try {
        const all_transactions = await db_dao.get_all_income()
        console.log("income", all_transactions)
        res.status(200).send(JSON.stringify(all_transactions))
    } catch (error) {
        console.log(error.message)
        res.status(400).send({ "Error": e.message })
    }
})


app.get('/api/v1/transactions/expenses', async function (req, res) {
    try {
        const all_transactions = await db_dao.get_all_expenses()
        console.log("expenses", all_transactions)
        res.status(200).send(JSON.stringify(all_transactions))
    } catch (error) {
        console.log(error.message)
        res.status(400).send({ "Error": e.message })
    }
})


app.use(upload.array());
app.use(express.static('public'));

app.post('/api/v1/transactions/save', function (req, res) {
    try {
        const values = Object.values(req.body)
        const result = values.filter(val => val === "")
        if (result.length > 0 || values.length != 6) {
            throw new Error("Bad request error")
        }
        db_dao.insert_transaction(req.body)
        const response = { 'message': 'transaction saved success' }
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error)
    }
})


app.put('/api/v1/transactions/update', function (req, res) {
    try {
        db_dao.update_transaction(req.body)
        const response = { 'message': 'transaction updated success' }
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error)
    }
})


app.delete('/api/v1/transactions/delete/:id', function (req, res) {
    try {
        console.log(req.params.id)
        db_dao.delete_transaction(req.params.id)
        const response = { 'message': 'transaction deleted success' }
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
        res.status(400).json(error)
    }
})


const port = process.env.PORT || '8081'
app.listen(port, function () {

    console.log(`Server listening on Port ${port}`)
})
