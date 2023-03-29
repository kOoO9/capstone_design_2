const express = require("express"); // npm i express | yarn add express
const cors  = require("cors");    // npm i cors | yarn add cors
const mysql = require("mysql");   // npm i mysql | yarn add mysql
const app  = express();
const http = require('http');
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

app.use(express.urlencoded({ extended: true })) 

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});


//값을 넣어줌
app.get("", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    
    const sqlQuery = "SELECT * FROM id_pw.user;"

    db.query(sqlQuery, (err, result) => {
        res.send(result);
        console.log(result);
    });
});



// const express = require('express');
// const app = express();
// const user_inform = require('./routes/user_inform');
 
// app.use('/user_inform', user_inform);
 
// const port = 3001;
// app.listen(port, () => console.log(`Node.js Server is running on port ${port}...`));
