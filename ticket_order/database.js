var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'ticket_db',
      user : 'user',
      password : '1234',
      database : 'db'
    }
});

knex.schema.hasTable('ticket').then(exist => {
    if (!exist) {
        return knex.schema.createTable('ticket', t => {
            t.increments('id').primary()
            t.increments('bookingId').primary()
            t.integer('userId')
            t.string('status')
        })
    }
})

module.exports = knex