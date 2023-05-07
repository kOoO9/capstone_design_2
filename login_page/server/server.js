// express 모듈 호출
const express = require('express');
const app = express();
const api = require('./routes/index');
// api 처리는 './routes/index'에서 일괄처리
app.use('/api', api);
 
// server port 3001 할당
// 클라이언트와 다른 번호로 충돌나지 않도록
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server run : http://localhost:${PORT}/`)
})

// const express = require("express"); // npm i express | yarn add express
const cors  = require("cors");    // npm i cors | yarn add cors
// const mysql = require("mysql");   // npm i mysql | yarn add mysql
// const app  = express();
// const path = require('path'); 
// const http = require('http');
// const PORT = 3001; // 포트번호 설정

// const db = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "capstone2"
// });

app.use(cors({
    origin: "*",                // 출처 허용 옵션
    credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
}))

// app.use(express.urlencoded({ extended: true })) 

// //값을 넣어줌
// app.get("/api/test", (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");
    
//     const sqlQuery = "SELECT * FROM capstone2.letures;"

//     db.query(sqlQuery, (err, result) => {
//         res.send(result);
//         console.log(result);
//     });
// });

// app.listen(PORT, () => {
//     console.log(`server running on port ${PORT}`);
// });
