// var knex = require('knex')({
//     client: 'pg',
//     connection: {
//         host: 'localhost',
//         // user : 'postgres',
//         // password : 'tototo',
//         database: 'postgres'
//     }
// });

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'ticketdb',
        port: 5432,
        database: 'ticket',
        user: 'postgres',
        password: 'example',
    }
});

knex.schema.hasTable('ticket').then(exist => {
    if (!exist) {
        return knex.schema.createTable('ticket', t => {
            t.increments('id').primary()
            t.integer('reservedBy')
            t.string('status')
            t.float('price')
        })
    }
})

module.exports = knex