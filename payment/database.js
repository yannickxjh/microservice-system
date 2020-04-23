var knex = require('knex')({
    client: 'pg',
    connection: {
      host : 'localhost',
      user : 'postgres',
      password : 'tototo',
      database : 'postgres'
    }
  });

  knex.schema.hasTable('payment').then(exists => {
    if (!exists) {
      return knex.schema.createTable('payment', function(t) {
        t.increments('id').primary();
        t.integer('ticketId');
        t.integer('userId');
        t.integer('ticketPrice')
        t.string('status');
      });
    }
  });

    module.exports = knex