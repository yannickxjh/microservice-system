const express = require('express')
const bodyParser = require('body-parser')

const PORT = 8001
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const user = require('./Api/user')
app.use('/', user)

app.listen(PORT, () => {
    console.log('Server launch start on port ' + PORT)
})

