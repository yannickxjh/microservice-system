var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'user_db',
      user : 'user',
      password : '1234',
      database : 'myapp_test'
    }
  });

  knex.schema.hasTable('payement').then(exists => {
    if (!exists) {
      return knex.schema.createTable('payement', function(t) {
        t.increments('id').primary();
        t.integer('ticketId');
        t.integer('userId');
        t.string('status');
      });
    }
  });

    module.exports = knex