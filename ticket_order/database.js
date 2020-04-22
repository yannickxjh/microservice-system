var knex = require('knex')({
    client: 'mysql',
    connection: {
      host: 'localhost',
      port: '3001',
      user: 'user',
      password: 'root',
      database: 'db'
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