const express = require('express')
const router = express.Router()
const knex = require('../database')

router.get('/ticket', (req, res) => {
    knex.select().from('ticket').then(result => {
        console.log(result)
        res.status(200).send(result)
    })
})

router.post('/ticket', (req, res) => {
    knex('ticket').insert({ status: 'Available', price: 10. }, 'id').then(id => {
        res.status(201).send({ id: id[0] })
    })
})

router.put('/ticket/order', (req, res) => {
    ticketId = req.body.ticketId
    userId = req.body.userId

    if (isNaN(ticketId)) {
        return res.status(400).send({ error: `Invalid ticket: ${ticketId}` })        
    } else if (isNaN(userId)) {
        return res.status(400).send({ error: `Invalid userId: ${userId}` })
    }
    knex('ticket').where('id', ticketId).then(ticket => {
        if (!ticket.length) {
            return res.status(400).send({ error: `Invalid ticket: ${ticketId}` })        
        } else if (ticket.status === 'Reserved') {
            return res.status(200).send()
        }
        knex('ticket')
            .update({ reservedBy: userId, status: 'Reserved' })
            .where('id', ticketId)
        res.status(200).send({ ticketId: ticketId })
    })
})

router.get('/ticket/:id', (req, res) => {
    const ticketId = req.params.id

    if (isNaN(ticketId)) {
        return res.status(400).send({ error: `Invalid ticket: ${ticketId}` })
    }
    knex('ticket').where('id', ticketId).then(ticket => {
        if (!ticket.length) {
            return res.status(400).send({ error: `Invalid ticket: ${ticketId}` })
        }
        res.status(200).send(ticket[0])
    })
})

router.put('/ticket/:id', (req, res) => {
    const ticketId = req.params.id

    if (isNaN(ticketId)) {
        return res.status(400).send({ error: `Invalid ticket: ${ticketId}` })
    }
    knex('ticket').where('id', ticketId).then(ticket => {
        if (!ticket.length) {
            return res.status(400).send({ error: `Invalid ticket: ${ticketId}` })
        }
        knex('ticket')
            .update({ reservedBy: null, status: 'Available' })
            .where('id', ticketId)
        res.status(205).send({ ticketId: ticketId })
    })
})

module.exports = router