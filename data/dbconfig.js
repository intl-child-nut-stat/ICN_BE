const knex = require('knex');
const config = require('../knexfile.js');
require('dotenv').config({path: '../.env'});

const environment = process.env.DB_ENV || 'development';


module.exports = knex(config[environment]);