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
    
    const onClickConfirmButton =()=>{
        if(username===User.email && password===User.pw){
            console.log("로그인에 성공했습니다.");
        }else{
            alert("등록되지 않았으므로 전남대에 문의하세요.");
        }

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