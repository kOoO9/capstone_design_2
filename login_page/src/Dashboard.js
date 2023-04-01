import React from "react";
import { useNavigate } from "react-router-dom";

function Secondpage(){
    const navigate = useNavigate();

    const Logout=()=>{
        navigate('/');
    }
    return(

        <div className="secondpage"> 
            <h1>로그인에 성공했습니다.</h1>
            <button onClick={Logout}>로그아웃</button>
        </div>
        
    )
}

export default Secondpage;