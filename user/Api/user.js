const express = require('express')
const router = express.Router()
const knex = require('../database')

router.post('/user/update/funds', (req, res) => {
    const user = req.body.userId
    const newBalance = req.body.balance

    if (newBalance >= 0) {
        knex('user')
            .where({ userId: user })
            .update({funds: newBalance})
        res.status(200).send({ status: "Ok"})
    } else {
        res.status(400).send({ status: "Failed request"})
    }
})

router.get('/user/funds', (req, res) => {
    const user = req.header.userId

    knex('user')
        .where({ userId: user})
        .returning('funds')
        .then(user => {
            res.status(200).send({ status: Ok}, { userId: user })
        })
})

module.exports = router
