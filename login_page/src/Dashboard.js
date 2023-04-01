import React from "react";
import { useNavigate } from "react-router-dom";

function Secondpage(props){
    const navigate = useNavigate();
    const IsLogin = props.IsLogin;

    const Logout=()=>{
        sessionStorage.removeItem('user_ID')
        const storedUsername = sessionStorage.getItem('user_ID');
        console.log("로그아웃 : ", storedUsername); // 출력 결과: "my_username"

        navigate('/');
    }
    return(

        <div className="secondpage"> 
            <h1>로그인에 성공했습니다.</h1>
            <button type='button' onClick={Logout}>로그아웃</button>
        </div>
        
    )
}

export default Secondpage;