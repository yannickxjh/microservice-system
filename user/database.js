var knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    database: 'postgres'
  }
});

knex.schema.hasTable('users').then(exists => {
  if (!exists) {
    return knex.schema.createTable('users', function (t) {
      t.increments('id').primary();
      t.integer('funds');
    });
  }
});

module.exports = knex