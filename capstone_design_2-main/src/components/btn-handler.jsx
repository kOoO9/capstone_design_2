import { useState, useRef } from "react";
import { Webcam } from "../utils/webcam";
import { Attendence } from "../utils/renderBox";
import labels from "../utils/labels.json";
import axios from 'axios';
import { useNavigate, Route, Link, useParams, Routes, Router } from 'react-router-dom';


export const updatedAttend = new Map();
for (let i = 0; i <= labels.length; i++) { 
  updatedAttend[labels[i]] = '출석';
}


export const ButtonHandler = ({ imageRef, cameraRef, videoRef }) => {
  const [streaming, setStreaming] = useState(null); // streaming state
  const inputImageRef = useRef(null); // video input reference
  const inputVideoRef = useRef(null); // video input reference
  const webcam = new Webcam(); // webcam handler

  // closing image
  const closeImage = () => {
    const url = imageRef.current.src;
    imageRef.current.src = "#"; // restore image source
    URL.revokeObjectURL(url); // revoke url

    setStreaming(null); // set streaming to null
    inputImageRef.current.value = ""; // reset input image
    imageRef.current.style.display = "none"; // hide image
  };

  // closing video streaming
  const closeVideo = () => {
    const url = videoRef.current.src;
    videoRef.current.src = ""; // restore video source
    URL.revokeObjectURL(url); // revoke url

    setStreaming(null); // set streaming to null
    inputVideoRef.current.value = ""; // reset input video
    videoRef.current.style.display = "none"; // hide video
  };






  return (
    <div className="btn-container">
      {/* Image Handler */}
      {/* <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const url = URL.createObjectURL(e.target.files[0]); // create blob url
          imageRef.current.src = url; // set video source
          imageRef.current.style.display = "block"; // show video
          setStreaming("image"); // set streaming to video
        }}
        ref={inputImageRef}
      />
      <button
        onClick={() => {
          // if not streaming
          if (streaming === null) inputImageRef.current.click();
          // closing image streaming
          else if (streaming === "image") closeImage();
          else alert(`Can't handle more than 1 stream\nCurrently streaming : ${streaming}`); // if streaming video or webcam
        }}
      >
        {streaming === "image" ? "Close" : "Open"} Image
      </button> */}

      {/* Video Handler */}
      {/* <input
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={(e) => {
          if (streaming === "image") closeImage(); // closing image streaming
          const url = URL.createObjectURL(e.target.files[0]); // create blob url
          videoRef.current.src = url; // set video source
          videoRef.current.addEventListener("ended", () => closeVideo()); // add ended video listener
          videoRef.current.style.display = "block"; // show video
          setStreaming("video"); // set streaming to video
        }}
        ref={inputVideoRef}
      />
      <button
        onClick={() => {
          // if not streaming
          if (streaming === null || streaming === "image") inputVideoRef.current.click();
          // closing video streaming
          else if (streaming === "video") closeVideo();
          else alert(`Can't handle more than 1 stream\nCurrently streaming : ${streaming}`); // if streaming webcam
        }}
      >
        {streaming === "video" ? "Close" : "Open"} Video
      </button> */}

      {/* Webcam Handler */}
      <button
        onClick={() => {
          // if not streaming
          if (streaming === null || streaming === "image") {
            // closing image streaming
            if (streaming === "image") closeImage();
            webcam.open(cameraRef.current); // open webcam
            cameraRef.current.style.display = "block"; // show camera
            setStreaming("camera"); // set streaming to camera
          }
          // closing video streaming
          else if (streaming === "camera") {
            webcam.close(cameraRef.current);
            cameraRef.current.style.display = "none";
            setStreaming(null);

            // console.log('AttendenceCheck.js ', Attendence);
            for (let i=0; i< labels.length; i++){
              console.log('Attendence[labels[i]].length ', Attendence[labels[i]].length);
              console.log('parseInt(Attendence["default"].length / 100) ', parseInt(Attendence['default'].length * 0.8 / 100)-1 )
	              if (Attendence[labels[i]].length >= parseInt(Attendence['default'].length * 0.8 / 100))
                  {updatedAttend[labels[i]] = '출석'}   
                else if (Attendence[labels[i]].length >= parseInt(Attendence['default'].length * 0.6 / 100))
                  {updatedAttend[labels[i]] = '지각'}                
                else {updatedAttend[labels[i]] = '결석'}
            axios
            .post("/api/update", updatedAttend)
            .then((response) => {
              // 서버 응답 처리
              console.log(updatedAttend);
              // console.log(response.data); // 응답 데이터 출력
              console.log("success--------------------------------------------------------------");
            })
            .catch((error) => {
              // 에러 처리
              console.log('e')
              console.error(error);
            });
            }
        window.location.reload();

          } else alert(`Can't handle more than 1 stream\nCurrently streaming : ${streaming}`); // if streaming video  
        
      
        }
      
      }
      >
        출석체크 {streaming === "camera" ? "종료" : "시작"}

        
      </button>
    </div>
  );
};

export default ButtonHandler;
