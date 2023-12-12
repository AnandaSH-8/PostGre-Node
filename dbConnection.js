const {Pool} = require('pg');
require("dotenv").config();


const pool = new Pool({
    password:process.env.DB_PASS,
    host:'localhost',
    port:8888,
    database:process.env.DB_NAME
});

module.exports = pool;