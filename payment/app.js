const express = require('express')
const bodyParser = require('body-parser')

const PORT = 8002
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const payment = require('./Api/payment')
app.use('/', payment)

app.listen(PORT, () => {
    console.log('Server launch start on port' + PORT)
})