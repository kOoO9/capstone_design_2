const mysql = require('mysql');

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "capston",
    password: "hayoung8647!",
    database: "id_pw"
});

module.exports=db;