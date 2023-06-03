const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "myadmin",
    password: "1222",
    database: "capston",
    port: 3307
});

module.exports=db;