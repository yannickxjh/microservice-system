const express = require('express')
const router = express.Router()

router.get('/ticket/:id', (req, res) => {
    knex.select().from('ticket').then(result => {
        res.status(200).send(result)
    })
})

router.post('/ticket/order', (req, res) => {
    const user = req.body.userId
    res.status(200).send({ succes: user })
})

module.exports = router