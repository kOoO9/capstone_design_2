import Login from './Login';
import axios from 'axios'; 
import React, {useEffect }  from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';

function App() {
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

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard IsLogin={IsLogin} />} />
        </Routes>
      </BrowserRouter>

      {/* {IsLogin ? 
        <Main IsLogin={IsLogin} /> : 
        <Login />} */}
    </>
  );
}export default App;
