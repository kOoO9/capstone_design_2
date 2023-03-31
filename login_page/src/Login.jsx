import axios from 'axios';
import React, { useEffect } from 'react'
import img from "./jnu_logo.png";

const User = {
    email: 'hayeong',
    pw: '1234'
  }

export default function Login(){
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [usernameVaild, setusernameValid] = React.useState(false);
    const [passwordVaild, setpasswordVaild] = React.useState(false);
    const [notallow, setNotallow] = React.useState(true);        

    useEffect(() => {
        if(usernameVaild && passwordVaild){
            setNotallow(false);
            return;
        }
        setNotallow(true);
    }, [usernameVaild, passwordVaild])


    const handleusername =(e)=>{
        setUsername(e.target.value);
        if(e.target.value.length > 0){
            setusernameValid(true);
        }
        else {
            setusernameValid(false);
        }
    }
    const handlepassword =(e)=>{
        setPassword(e.target.value);
        if(e.target.value.length > 0){
            setpasswordVaild(true);
        }
        else {
            setpasswordVaild(false);
        }
    }
    
    // const onClickConfirmButton =()=>{
    //     if(username===User.email && password===User.pw){
    //         console.log("로그인에 성공했습니다.");
    //     }else{
    //         alert("등록되지 않았으므로 전남대에 문의하세요.");
    //     }
    // }

    const onClickConfirmButton = () => {
        axios.post('/api/user_inform',null , {
          'user_ID': username,
          'user_pw': password
        }).then(response => {
          const data = response.data;
          if (data.result === true) {
            alert('로그인 되었습니다!');
            // 로그인 성공 시 처리
          } else {
            console.log(response.data);
            alert('아이디 또는 비밀번호가 일치하지 않습니다!');
            // 로그인 실패 시 처리
          }
        }).catch(error => {
          console.error(error);
          alert('로그인에 실패하였습니다.');
        });
      }


    return(
        <div className='page'>
            <div className='contentWrap'>
                <div className='system'>학생 출결 관리 시스템</div>

                <div className='titleWrap'>
                    <img src={img} alt="Logo" /> {/* //학교 이미지*/}
                </div>  

                <div className='inputWrap'>
                    <input type="text" name='id' id='id' autoComplete='off' required
                    placeholder='USERNAME'
                    value={username}
                    onChange={handleusername}></input>
                </div>

                <div className='inputWrap'>
                <input type="password" name='pw' id='pw' autoComplete='off' required
                    placeholder='PASSWORD'
                    value={password}
                    onChange={handlepassword}></input>
                </div>
 
                <div className='btn'>
                    <button onClick={onClickConfirmButton} disabled={notallow} type='submit'>LOGIN</button>
                </div>
            </div>

        </div>
    )
}

