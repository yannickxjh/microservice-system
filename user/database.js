var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : 'user_db',
      user : 'user',
      password : '1234',
      database : 'myapp_test'
    }
  });

  knex.schema.hasTable('users').then(exists => {
    if (!exists) {
      return knex.schema.createTable('users', function(t) {
        t.increments('id').primary();
        t.string('name', 100);
      });
    }
  });

    module.exports = knex