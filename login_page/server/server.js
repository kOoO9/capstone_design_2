const express = require("express"); // npm i express | yarn add express
const cors  = require("cors");    // npm i cors | yarn add cors
const mysql = require("mysql");   // npm i mysql | yarn add mysql
const app  = express();
const util = require('util');
const PORT = 3001; // 포트번호 설정

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "capston",
    password: "hayoung8647!",
    database: "id_pw"
});

app.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true })) 

app.get("/api/user_inform", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT * FROM id_pw.user;"
    db.query(sqlQuery, (err, result) => {
        res.send(result);
        console.log(result);
    });
});

app.post('/api/user_inform', (req, res) => {
    const user_ID = req.body.user_ID;
    const user_pw = req.body.user_pw;
  
    const query = `SELECT COUNT(*) AS count FROM id_pw.user WHERE user_ID = ? AND user_pw = ?`;
  
    db.query(query, [user_ID, user_pw], (error, results) => {
      if (error) {
        console.log(error);
      }
      
      const count = results[0].count;
      const result = (count === 1);
  
      res.send({
        result: result
      });
    });
  });




app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});



