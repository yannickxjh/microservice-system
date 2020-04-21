const express = require('express')
const bodyParser = require('body-parser')

const PORT = 5001
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.listen(PORT, () => {
    console.log('Server launch start on port ' + PORT)
})