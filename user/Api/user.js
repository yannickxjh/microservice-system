const express = require('express')
const router = express.Router()
const knex = require('../database')

router.get('/user', (req, res) => {
    knex.select().from('users').then(users => {
        res.status(200).send(users)
    })
})

router.post('/user', (req, res) => {
    const funds = req.body.funds

    if (isNaN(funds)) {
        return res.status(400).send({ error: `Invalid funds: ${funds}` })
    }
    knex('users')
        .returning('id')
        .insert({ funds: funds })
        .then(id => {
            res.status(201).send({ userId: id[0] })
        })
})

router.get('/user/:id', (req, res) => {
    const userId = req.params.id

    if (isNaN(userId)) {
        return res.status(400).send({ error: `Invalid user: ${userId}` })
    }
    knex('users')
        .where('id', userId)
        .then(user => {
            if (!user.length) {
                return res.status(400).send({ error: `Invalid user: ${userId}` })
            }
            res.status(200).send(user[0])
        })
})

router.patch('/user/:id', (req, res) => {
    const userId = req.params.id
    const funds = req.body.funds

    if (isNaN(userId)) {
        return res.status(400).send({ error: `Invalid user: ${userId}` })
    } else if (isNaN(funds)) {
        return res.status(400).send({ error: `Invalid amount: ${funds}` })
    } else if (funds >= 0) {
        knex('users').where({ id: userId }).then(user => {
            if (!user.length) {
                return res.status(400).send({ error: `Invalid user: ${userId}` })
            }
            knex('users')
                .returning(['id', 'funds'])
                .update({ funds: funds })
                .where({ id: userId })
                .then(user => {
                    res.status(200).send(user[0])
                })
        })
    } else {
        return res.status(400).send({ error: `Unexpected negative amount: ${funds}` })
    }
})

router.delete('/user/:id', (req, res) => {
    const userId = req.params.id
    
    if (isNaN(userId)) {
        return res.status(400).send({ error: `Invalid user: ${userId}` })
    }
    knex('users').where('id', userId).then(user => {
        console.log(user)
        if (!user.length) {
            return res.status(400).send({ error: `Invalid user: ${userId}` })
        }
        knex('users')
            .where('id', userId)
            .del()
            .then(() => {
                res.status(204).send()
            })
    })
})

module.exports = router
