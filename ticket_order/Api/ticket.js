const express = require('express')
const router = express.Router()
//const knex = require('../database')

router.get('/test', (req, res) => {

})

// router.post('/ticket/order', (req, res) => {
//     const user = req.body.userId

//     knex('ticket')
//         .returning('id')
//         .insert([{ userId: user }, { status: 'onWaiting' }])
// })

module.exports = router