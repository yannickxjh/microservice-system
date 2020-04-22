const express = require('express')
const router = express.Router()
const knex = require('../database')

router.get('/ticket/:id', (req, res) => {
    knex.select().from('ticket').then(result => {
        res.status(200).send(result)
    })
})

router.post('/ticket/order', (req, res) => {
    const user = req.body.userId

    knex('ticket')
        .returning('id')
        .insert([{ userId: user }, { status: 'onWaiting' }])
})

module.exports = router