// import Login from './Login';
import axios from 'axios'; 
import React, {useEffect }  from 'react';
import { BrowserRouter, Link, Routes, Route, Switch, useNavigate } from 'react-router-dom';
// import Dashboard from './Dashboard';
import img from "./jnu_logo.png";

import styles from './LoginPage.module.css';


function LoginPage() {
  const [IsLogin, setIsLogin] = React.useState(false);

  useEffect(() => {
    axios.get('/api/user_inform')
      .then(res => console.log(res))
      .catch(err => console.log(err))

    if(sessionStorage.getItem('user_ID')==null){
      console.log('isLogin 값이 어떻게 되어있는가', IsLogin); //저장된 값이 없다면
    }else{
      setIsLogin(true);
      console.log('isLogin 값이 어떻게 되어있는가', IsLogin);//저장된 값이 있다면
    }
  }, [])

  

      const [username, setUsername] = React.useState('');
      const [password, setPassword] = React.useState('');
      const [usernameVaild, setusernameValid] = React.useState(false);
      const [passwordVaild, setpasswordVaild] = React.useState(false);
      const [notallow, setNotallow] = React.useState(true);        
      const navigate = useNavigate();
  
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
      
      const onClickConfirmButton = () => {
          axios.post('/api/user_inform', {
              'user_ID': username,
              'user_pw': password
          }).then(response => {
            const data = response.data;
            if (data.result === true) {
              // alert('로그인 되었습니다!');
              sessionStorage.setItem('user_ID', username);
              const storedUsername = sessionStorage.getItem('user_ID');
              console.log("로그인 아이디 : ", storedUsername); // 출력 결과: "my_username"
              navigate(`${storedUsername}/lectures`);
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
        <div className={styles.box}>
        <table className={styles.tbl}>
          <tr className={styles.system}>
              학생 출결 관리 시스템
          </tr>
          <tr><hr></hr></tr>
          <tr>
            <div className={styles.titleWrap}>
              <img width='400px' src={img} alt="Logo" /> {/* //학교 이미지*/}
            </div>
          </tr>

          <tr className={styles.inputWrap}>
            <input type="text" name='id' id='id' autoComplete='off' required
            placeholder='USERNAME'
            value={username}
            onChange={handleusername}></input>
          </tr>
  
            <tr className={styles.inputWrap}>
              <input type="password" name='pw' id='pw' autoComplete='off' required
                  placeholder='PASSWORD'
                  value={password}
                  onChange={handlepassword}></input>
            </tr>
   
            <tr>
              <div  className={styles.btn}>
              {/* <Link to={`/${username}/edit`}> */}
                <button onClick={onClickConfirmButton} disabled={notallow} type='submit'>LOGIN</button>
              {/* </Link> */}
              </div>
            </tr>
        </table>
            <p className={styles.copyright}>Developed by 빠지지말아조 | hayeong koo, chaewon kim</p>
        </div>
      )
  }


export default LoginPage;
