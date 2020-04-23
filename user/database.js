// var knex = require('knex')({
//   client: 'pg',
//   connection: {
//     host: 'localhost',
//     // user : 'postgres',
//     // password : 'tototo',
//     database: 'postgres'
//   }
// });

var knex = require('knex')({
  client: 'pg',
  connection: {
    host: 'userdb',
    port: 5433,
    database: 'users',
    user: 'postgres',
    password: 'example'
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