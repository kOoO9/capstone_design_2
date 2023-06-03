import React, { useEffect, useState } from 'react';

import styles from './ModifyAttendence.module.css';
import axios from 'axios';
import { useNavigate, Route, Link, useParams, Routes, Router } from 'react-router-dom';


const ModifyAttendence = () => {

  var today = new Date();
  var year = today.getFullYear();
  var month = ('0' + (today.getMonth() + 1)).slice(-2);
  var date = ('0' + today.getDate()).slice(-2);
  var yyyy_mm_dd = year + '_' + month + '_' + date
  var _mm_dd = '_' + month + '_' + date


  const [fetchedData, setFetchedData] = useState({});
  const [modifiedData, setModifiedData] = useState({});

  useEffect(() => {
    fetchData();  
  }, []);

  // 서버에서 데이터를 가져오는 함수
  const fetchData = async () => {
    try{
      const response = await axios.get('/api/edit');
      // 가져온 데이터를 state에 저장
      setFetchedData(response.data);
      console.log('.get response.data', response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 수정된 데이터를 서버에 보내는 함수
  const handleDataUpdate = async () => {
    try {
      const response = await axios.post('/api/edit', modifiedData);
      console.log('.post response.data', response.data);
    } catch (err) {
      console.error(err);
    }
  };

  // 데이터를 수정하는 이벤트 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModifiedData(prevData => ({ ...prevData, [name]: value }));
  };

  
  return (

    <div className={styles.AttendenceCamBox}>
        <table className={styles.AttendenceCamTable}>
        {Object.values(fetchedData) ? Object.values(fetchedData).map((fetchedDatas)=>(
                      <th colSpan={2} className={styles.lectureName}>
                          <p>{fetchedDatas.lecture_name}</p>
                      </th>
                        )) : ''}
            <tr height='400'>

                <td className={styles.attendenceTd}>
                    <table className={styles.AttendenceCheckTable}>
                        <tr height='40'>
                            <th width='150' align="center">학생명</th>
                            <th width='70' align="center">출석여부</th>
                        </tr>
                        {Object.values(fetchedData) ? Object.values(fetchedData).map((fetchedDatas)=>(
                            
                            <tr id={fetchedDatas.student_id} height='30px'>
                                <td className={styles.classCols}>
                                        <li>{fetchedDatas.student_name}</li>
                                </td>
                                <td className={styles.btnCols}>
                                    {/* <p>{inputDatas[`attendence${_mm_dd}`]}</p> */}
                                    {/* <select onChange={handleInputChange} name={`${itemData[0].student_id}`} value={itemData[0].attendence_04_12 || ''}>{options}</select> */}
                                    <select onChange={handleInputChange} name={fetchedDatas.student_name}>
                                      <option value=""></option>
                                      <option value="출석">출석</option>
                                      <option value="결석">결석</option>
                                      <option value="지각">지각</option>
                                    </select>
                                </td>
                            </tr>
    
                        )) : ''}
                    </table>
                </td>
    
                {/* <td className={styles.ipCamTd}>
                    <td><button className={styles.startCam}>시작</button></td>
                    
                    <video controls='controls' poster='http://via.placeholder.com/640x360'>
                    </video>
                    
                </td> */}
            </tr>
        </table>

        <div className={styles.modifyBtn}>
            {Object.values(fetchedData) ? Object.values(fetchedData).map((fetchedDatas)=>(
                <Link to={`/${fetchedDatas.lecture_code}`}>
                    <button onClick={handleDataUpdate}>저장</button>
                    <button>취소</button>
                </Link>
            ))[0] : ''}
        </div>

    </div>

);

}


export default ModifyAttendence;