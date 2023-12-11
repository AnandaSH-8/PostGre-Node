const {Pool} = require('pg');


const pool = new Pool({
    user : process.env.DB_USER,
    password:process.env.DB_PASS,
    host:'localhost',
    port:8888,
    database:process.env.DB_NAME
});

module.exports = pool;