const express = require('express')
const router = express.Router()
const knex = require('../database')

router.post('/payement/order', (req, res) => {
    const user = req.body.userId
    const ticket = req.body.ticketId
    const userFunds = req.body.funds
    const ticketPrice = req.body.price

    knex('payement')
        .returning('ticketId')
        .insert([{ userId: user }, { ticketId: ticket }, { status: 'onWaiting' }])
        .then(id => {
            if (ticketPrice > userFunds) {
                knex('payement')
                    .where( {userId: user} )
                    .update({ status: 'Rejected'})
                res.status(200).send({ status: "Failed, not enough funds"})
            } else {
                var newBalance = userFunds - ticketPrice
                // Update user balance

                knex('payement')
                    .returning('tickerId')
                    .where( {userId: user} )
                    .update([{ status: 'Accepted' }])
                    .then(ticket => {
                        res.status(200).send({ status: "Accepted"}, { ticketId: ticket})
                    })
            }
            // res.status(200).send({ succes: id })  
        })
})

module.exports = router