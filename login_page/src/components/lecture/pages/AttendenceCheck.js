import React, { useEffect, useState, useRef } from 'react';

import styles from './AttendenceCheck.module.css';
import axios from 'axios';
import { useNavigate, Route, Link, useParams, Routes, Router } from 'react-router-dom';

import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl"; // set backend to webgl
import Loader from "../../../components/loader";
import ButtonHandler from "../../../components/btn-handler";
import { detectImage, detectVideo } from "../../../utils/detect";
import "../../../style/Live.css";

// import Live from "../../../components/lecture/live/Live.js";



function StudentList(){

    var today = new Date();
    var year = today.getFullYear();
    var month = ('0' + (today.getMonth() + 1)).slice(-2);
    var date = ('0' + today.getDate()).slice(-2);
    var yyyy_mm_dd = year + '_' + month + '_' + date
    var attendence_mm_dd = 'attendence_' + month + '_' + date


    const [inputData, setInputData] = useState()

    useEffect(() => {
        try {
            studentForLectureData();
        } catch(e){
            console.error(e.message)
        }
    }, [])

    async function studentForLectureData() {
        await axios
        .get('/api/attendence')
        .then((res)=>{
            // console.log('attendenceCheck.js', res.data.lecture_code);
            setInputData(res.data);
            // console.log(res.data[0][`attendence${_mm_dd}`]);
        })
        .catch((err)=>{
            console.log(err);
        })

    }



    // -----------------------------------------------------------------

    const [loading, setLoading] = useState({ loading: true, progress: 0 }); // loading state
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  }); // init model & input shape

  // references
  const imageRef = useRef(null);
  const cameraRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // model configs
  const modelName = "yolov5s";
  const classThreshold = 0.2;

  useEffect(() => {
    tf.ready().then(async () => {
      const yolov5 = await tf.loadGraphModel(
        `${window.location.origin}/${modelName}_web_model/model.json`,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions }); // set loading fractions
          },
        }
      ); // load model

      // warming up model
      const dummyInput = tf.ones(yolov5.inputs[0].shape);
      const warmupResult = await yolov5.executeAsync(dummyInput);
      tf.dispose(warmupResult); // cleanup memory
      tf.dispose(dummyInput); // cleanup memory
      console.log('model', model)
      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov5,
        inputShape: yolov5.inputs[0].shape,
      }); // set model & input shape

    //   console.log('model', model)
    //   console.log('yolov5', yolov5);

      

    //   console.log('yolov5', yolov5);
    //   console.log('yolov5', yolov5);

    });
  }, []);






    

    return (

        <div className={styles.AttendenceCamBox}>
                <table className={styles.AttendenceCamTable}>
                {/* {inputData ? inputData.map((inputDatas)=>(
                    <tr height='100px'>
                        <p>{inputDatas.lecture_code}</p>
                    </tr>
                    ))[0] : ''} */}
                        <tr height='400'>
                            <td className={styles.attendenceTd}>
                                <table className={styles.AttendenceCheckTable}>
                                    <tr height='40px'>
                                        <th width='150' align="center">학생명</th>
                                        <th width='70' align="center">출석</th>
                                    </tr>
                                    
                                    {inputData ? inputData.map((inputDatas)=>(                 
                                        <tr id={inputDatas.student_id} height='30px'>
                                            <td>
                                                    <li>{inputDatas.student_name}</li>
                                            </td>
                                            <td>
                                                <p className={styles.pMargin}>
                                                    {inputDatas[`${attendence_mm_dd}`]}
                                                </p>
                                            </td>
                                        </tr>           
                                    )) : ''} 
                                </table>
                            </td>
                        
                            <td className={styles.ipCamTd}>
                                <td>
                                    <ButtonHandler cameraRef={cameraRef} />
                                    
                                </td>
                                

                                <div className="content" >
                                        <video
                                        //   style
                                        autoPlay
                                        muted
                                        ref={cameraRef}
                                        onPlay={() => detectVideo(cameraRef.current, model, classThreshold, canvasRef.current)}
                                        />
                                        <canvas width={model.inputShape[1]} height={model.inputShape[2]} ref={canvasRef} />
                                    </div>

                                
                                <div className="App">
                                    {loading.loading && <Loader>Loading model... {(loading.progress * 100).toFixed(2)}%</Loader>}                                    
                                </div>
                            </td>

                        </tr>
                </table>
                
                <div className={styles.modifyBtn}>
                    {inputData ? inputData.map((inputDatas)=>(

                        <Link to={`/${inputDatas.lecture_code}/edit`}>
                            <button>수정</button>
                        </Link>
                    ))[0] : ''}
                </div>
        </div>
      
    );
};

export default StudentList;