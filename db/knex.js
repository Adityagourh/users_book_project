let environments = 'development';
let config = require('../knexfile')[environments];
module.exports = require('knex')(config);