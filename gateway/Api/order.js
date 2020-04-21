const express = require('express')

const router = express.Router()

router.get('/ticket', (req, res) => {

})

router.post('/ticket/:id', (req, res) => {
    const body = req.body
    console.log(body)
    res.status(200).send(body)
})

module.exports = router