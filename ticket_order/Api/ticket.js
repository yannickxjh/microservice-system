const express = require('express')
const router = express.Router()
const knex = require('../database')

router.get('/ticket', (req, res) => {
    knex.select().from('db').then(result => {
        console.log(result)
        res.status(200).send(result)
    })
})

router.post('/ticket/order', (req, res) => {
    const user = req.body.userId

    // knex('ticket')
    //     .returning('id')
    //     .insert([{ userId: user }, { status: 'onWaiting' }])
    //     .then(id => {
    //         res.status(200).send({ succes: id })  
    //     })
    res.status(200).send({ succes: user })
})

module.exports = router