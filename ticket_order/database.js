var knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        database: 'postgres'
    }
});

// var knex = require('knex')({
//     client: 'pg',
//     connection: {
//         host: '172.0.0.1',
//         port: 5432,
//         database: 'ticket',
//         user: 'postgres',
//         password: '1234'
//     }
// });

knex.schema.hasTable('ticket').then(exist => {
    if (!exist) {
        console.log("CREATE")
        return knex.schema.createTable('ticket', t => {
            t.increments('id').primary().unique()
            t.integer('bookingId')
            t.integer('userId')
            t.string('status')
        })
    }
    console.log("EXIST")
})

module.exports = knex