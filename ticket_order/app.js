const express = require('express')
const bodyParser = require('body-parser')

const PORT = 8000
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const ticket = require('./Api/ticket')
app.use('/', ticket)

app.listen(PORT, () => {
    console.log('Server launch start on port ' + PORT)
})