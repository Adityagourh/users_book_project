// knexfile.js

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'bitcot',
      database: 'sql_demo',
    },
    migrations: {
      directory: './db/migrations', 
    },
    seeds: {
      directory: './db/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL, 
    migrations: {
      directory: './db/migrations', 
    },
    seeds: {
      directory: './db/seeds', 
    },
  },
};
const knex = require('knex')(module.exports.development);

knex.raw('SELECT 1+1 as result') 
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  })
  .finally(() => {
    knex.destroy(); 
  });