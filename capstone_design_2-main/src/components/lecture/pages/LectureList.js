// import React from 'react';
import React, { useEffect, useState } from 'react';

import axios from 'axios';
import styles from './LectureList.module.css';
import { Route, Link, useParams, Routes, Router  } from 'react-router-dom';

import AttendenceCheck from '../pages/AttendenceCheck'


function LectureList(){

    const [inputData, setInputData] = useState()

    useEffect(() => {
        try {
            lectureData();
        } catch(e){
            console.error(e.message)
        }
    }, [])

    async function lectureData() {
        await axios
        .get('/api/test')
        .then((res)=>{
            console.log(res.data); 
            setInputData(res.data);
        })
        .catch((err)=>{
            console.log(err);
        })

    }
    
    const { id } = useParams();

    return (
        <div>
            {/* <div className={styles.TitleBox}>
                <h1 className={styles.ListTitle}>진행 강좌 목록</h1>
            </div> */}
            <div className={styles.LecturesBox}>
                <table className={styles.LecturesTable}>
                    <th colSpan={2} className={styles.ListTitle}>
                        나의 강좌 목록
                        {/* <br></br> */}
                        <hr></hr>
                    </th>

                {inputData ? inputData.map((inputDatas)=>(
                        <tr id={inputDatas.lecture_code}>
                            <td className={styles.classCols} border-left='0'>
                                <div padding='10px'>
                                    <li>{inputDatas.lecture_name}</li>
                                </div>
                            </td>
                            <td className={styles.btnCols}>
                                {/* <button><Link to={`/attendence/${inputDatas.lecture_code}`}>출석체크</Link></button> */}
                                {/* <button type='button' onClick={`/attendence/?id=${inputDatas.lecture_code}`}>출석체크</button> */}
                                <Link to={`/${inputDatas.lecture_code}`}>
                                    <button>출석체크</button>
                                </Link>
                            </td>
                        </tr>
                    

                )) : ''}

                </table>
            </div>
            <p className={styles.copyright}>Developed by 빠지지말아조 | hayeong koo, chaewon kim</p>
        </div>
        
    );
};


export default LectureList;