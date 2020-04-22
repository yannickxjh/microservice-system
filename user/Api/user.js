const express = require('express')
const router = express.Router()
const knex = require('../database')

router.patch('/user/update/funds', (req, res) => {
    const user = req.body.userId
    const newBalance = req.body.balance

    if (newBalance >= 0) {
        knex('users')
            .where({ userId: user })
            .update({funds: newBalance})
        res.status(200).send({ status: "Ok"})
    } else {
        res.status(400).send({ status: "Failed request"})
    }
})

router.get('/user/funds', (req, res) => {
    const user = req.header.userId

    knex('users')
        .where({ userId: user})
        .returning('funds')
        .then(user => {
            res.status(200).send({ status: Ok}, { userId: user })
        })
})

router.post('/user', (req, res) => {
    const userFund = req.body.funds

    if (isNaN(userFund)) {
        return res.status(400).send({ error: `Invalid amount of funds: ${userFund}` })
    }
    knex('users')
        .insert({ funds: userFund })

    res.status(201).send()
})

module.exports = router
