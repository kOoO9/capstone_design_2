const express = require('express');
const router = express.Router();
const db = require('../config/db');
 
router.get('/api/user_inform', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    const sqlQuery = "SELECT * FROM id_pw.user;"

    db.query(sqlQuery, (err, result) => {
        res.send(result);
    });
});



module.exports = router;