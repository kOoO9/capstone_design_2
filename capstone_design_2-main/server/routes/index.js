const express = require('express');
const router = express();
const db = require('../config/db')
var url = require('url');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


// const util = require('util');
// const PORT = 3001; // 포트번호 설정


// router.use(cors({
//     origin: "*",                // 출처 허용 옵션
//     credentials: true,          // 응답 헤더에 Access-Control-Allow-Credentials 추가
//     optionsSuccessStatus: 200,  // 응답 상태 200으로 설정
// }))

router.use(express.json());
router.use(express.urlencoded({ extended: true })) 

router.get("/user_inform", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    const sqlQuery = "SELECT * FROM capston.user;"
    db.query(sqlQuery, (err, result) => {
        res.send(result);
        console.log(result);
    });
});

router.post('/user_inform', (req, res) => {
    const user_ID = req.body.user_ID;
    const user_pw = req.body.user_pw;
  
    const query = `SELECT COUNT(*) AS count FROM capston.user WHERE user_ID = ? AND user_pw = ?`;
  
    db.query(query, [user_ID, user_pw], (error, results) => {
      if (error) {
        console.log(error);
      }
      // console.log(results);     
      const count = results[0].count;
      const result = (count === 1);
  
      res.send({
        result: result
      });
    });
  });


// router.listen(PORT, () => {
//     console.log(`server running on port ${PORT}`);
// });



router.get('/test', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var q = url.parse(req.headers.referer);
    var lecture_code = q.path.split('/')[1];
    // console.log('lecture_code', lecture_code);

    // var sql1 = "SELECT * FROM capston.lectures";
    var sql1 = `SELECT * FROM capston.lectures WHERE professors_id='${lecture_code}' ORDER BY lecture_name;`;

    db.query(sql1, (err, result) => {
        if(!err) {
          console.log(result);
            res.send(result);

            var today = new Date();
            var month = ('0' + (today.getMonth() + 1)).slice(-2);
            var date = ('0' + today.getDate()).slice(-2);
            var attendence_mm_dd = 'attendence_' + month + '_' + date
        
            var sql = `SELECT EXISTS (SELECT 1 FROM Information_schema.columns WHERE table_name = 'studentforlecture' AND column_name = '${attendence_mm_dd}') AS result`
        
            db.query(sql, (err, result) => {
                if (Object.values(result[0])[0] === 0) {
        
                    var sql_mkcol = `ALTER TABLE studentforlecture ADD ${attendence_mm_dd} varchar(5);`
                    var sql_init = `UPDATE studentforlecture SET ${attendence_mm_dd}='결석';`
        
        
                    db.query(sql_mkcol, (err1, result1) => {
                        if (err1) {
                          console.log('cannot add new column in table "studentforlecture".');
                          console.error(err1);
                        } else {
                          console.log('add new column ' + attendence_mm_dd);
                          
                          db.query(sql_init, (err2, result2) => {
                            if (err2) {
                                console.error(err2);
                                console.log(`Cannot update column ${attendence_mm_dd}`);
                              } else {
                                console.log(`Update column ${attendence_mm_dd}`);
                              }
                          })
                        }
                      });
                }
                })

        } else {
            res.send(err);
        }        
    });
})

router.get('/attendence', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var today = new Date();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var date = ('0' + today.getDate()).slice(-2);
    var attendence_mm_dd = 'attendence_' + month + '_' + date
    
    var q = url.parse(req.headers.referer);
    var lecture_code = q.path.substring(1);

    var sql2 = `SELECT student_name, student_id, lecture_code, ${attendence_mm_dd} FROM capston.studentforlecture WHERE lecture_code=? ORDER BY student_name;`
    db.query(sql2, lecture_code, (err3, result3) => {
        if(err3) {
            console.error(err3);
        } else {
            console.log('success', result3[0].lecture_code);
            // res.send(result3);
            var sql3 = 'SELECT lecture_name, professors_id FROM capston.lectures WHERE lecture_code=?'
            db.query(sql3, lecture_code, (err4, result4) => {
              if (err4){
                console.error(err4);
              } else {
                let response = []
                const filter = result3.map(data => ({
                  ...data, lecture_name: result4[0].lecture_name, professors_id: result4[0].professors_id
                }))

                response = [...filter]
                res.send(response);
                console.log(response);       
              }
            })
        }
    });
})


router.get('/edit', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var today = new Date();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var date = ('0' + today.getDate()).slice(-2);
    var attendence_mm_dd = 'attendence_' + month + '_' + date
    
    var q = url.parse(req.headers.referer);
    var lecture_code = q.path.split('/')[1];
    // console.log('q', q);

    var sql2 = `SELECT student_name, student_id, lecture_code, ? FROM capston.studentforlecture WHERE lecture_code=? ORDER BY student_name;`
    var values = [attendence_mm_dd, lecture_code];
    db.query(sql2, values, (err3, result3) => {
        if(err3) {
            console.error(err3);
        } else {
            console.log('success', result3);
            // res.send(result3);
            var sql3 = 'SELECT lecture_name FROM capston.lectures WHERE lecture_code=?'
            db.query(sql3, lecture_code, (err4, result4) => {
              if (err4){
                console.error(err4);
              } else {
                let response = []
                const filter = result3.map(data => ({
                  ...data, lecture_name: result4[0].lecture_name
                }))

                response = [...filter]
                res.send(response);
                console.log(response);       
              }
            })
        }
    })
})

const util = require('util')


router.post('/edit', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");

    var today = new Date();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var date = ('0' + today.getDate()).slice(-2);
    var attendence_mm_dd = 'attendence_' + month + '_' + date

    var q = url.parse(req.headers.referer);
    var lecture_code = q.path.split('/')[1];
    console.log('lecture_code', lecture_code);
    
    var studentList = Object.keys(req.body);
    var attendenceList = Object.values(req.body);

    var sql_edit = `UPDATE studentforlecture SET ${attendence_mm_dd}=? WHERE student_name=? AND lecture_code=?;`;

    for (var i = 0; i < studentList.length; i++) {
        var studentName = studentList[i];
        var attendence = attendenceList[i];
      
        // SQL 쿼리 실행
        db.query(sql_edit, [attendence, studentName, lecture_code], (err, result) => {
          if (err) {
            // 에러 처리
            console.error(err);
          } else {
            // 결과 처리
            console.log('Updated student: ' + studentName);
          }
        });

    };
    }
);


router.post('/update', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

    var today = new Date();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var date = ('0' + today.getDate()).slice(-2);
    var attendence_mm_dd = 'attendence_' + month + '_' + date

    // var q = url.parse(req.headers.referer);
    // var lecture_code = q.path.split('/')[1];
    
    var q = url.parse(req.headers.referer);
    var lecture_code = q.path.substring(1);
    console.log('lecture_code', lecture_code);
    console.log('update req ', req);
    
    var studentList = Object.keys(req.body);
    var attendenceList = Object.values(req.body);

    console.log('studentList', studentList);
    console.log('attendenceList', attendenceList);


    var sql_edit = `UPDATE studentforlecture SET ${attendence_mm_dd}=? WHERE student_name=? AND lecture_code=?;`;

    for (var i = 0; i < studentList.length; i++) {
        var studentName = studentList[i];
        var attendence = attendenceList[i];
      
        // SQL 쿼리 실행
        db.query(sql_edit, [attendence, studentName, lecture_code], (err, result) => {
          if (err) {
            // 에러 처리
            console.error(err);
          } else {
            // 결과 처리
            console.log('Updated student: ', studentName[i]);
          }
        });

    };
    }
)
  

module.exports = router;