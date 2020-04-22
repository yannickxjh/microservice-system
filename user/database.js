var knex = require('knex')({
    client: 'pg',
    connection: {
       host: 'localhost',
       port: 5432,
       user: 'postgres',
       password: 'tototo',
       database: 'postgres'
    }
});


// var knex = require('knex')({
//     client: 'pg',
//     connection: {
//       host : '172.0.0.1',
//       port: 5432,
//       user : 'postgres',
//       password : '1234',
//       database : 'myapp_test'
//     }
//   });

  knex.schema.hasTable('users').then(exists => {
    console.log("schema ----------------")
    if (!exists) {
      return knex.schema.createTable('users', function(t) {
        t.increments('id').primary();
        t.integer('funds');
      });
    }
  });

    module.exports = knex