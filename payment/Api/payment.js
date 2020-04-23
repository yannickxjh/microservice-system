const express = require('express')
const router = express.Router()
const knex = require('../database')

router.post('/payment/order', (req, res) => {
    const user = req.body.userId
    const ticket = req.body.ticketId
    const ticketPrice = req.body.price

    if (isNaN(user)) {
        return res.status(400).send({ error: `Invalid user ${user}`})
    } else if (isNaN(ticket)) {
        return res.status(400).send({ error: `Invalid ticketId ${ticket}`})
    } else if (isNaN(ticketPrice)) {
        return res.status(400).send({ error: `Invalid ticket price ${ticketPrice}`})
    }

    knex('payment')
        .returning('id')
        .insert([{ userId: user, ticketId: ticket, ticketPrice: ticketPrice, status: 'onWaiting'}])
        .then(id => {
            res.status(200).send( { id: id[0] } )
        })
})

router.get('/payment', (req, res) => {
    knex('payment')
        .select()
        .then(getAll => {
            res.status(200).send(getAll)
        })
})

router.post('/payment/:id', (req, res) => {
    const userFunds = req.body.funds
    const paymentId = req.params.id

    if (isNaN(userFunds)) {
        return res.status(400).send({ error: `Invalid user found ${userFunds}`})
    } else if (isNaN(paymentId)) {
        return res.status(400).send({ error: `Invalid payment id ${p}`})
    }

    knex('payment')
        .where('id', paymentId)
        .then(order => {
            if (!order.length) {
                return res.status(400).send({ error: `Invalid payment order: ${id}` })
            } 
            if (order[0].ticketPrice > userFunds) {
                knex('payment')
                    .where('id', paymentId)
                    .update({ status: 'Rejected'})
                    .then(order => {
                        res.status(400).send({ error: `Failed, not enough funds ${userFunds}`})
                    })
            } else {
                var newBalance = userFunds - order[0].ticketPrice              
                knex('payment')
                    .returning('ticketId')
                    .where('id', paymentId)
                    .update({ status: 'Accepted' })
                    .then(order => {
                        res.status(200).send({ status: "Accepted", ticketId: order[0], newFund: newBalance })
                    })
            }
        })
})

module.exports = router