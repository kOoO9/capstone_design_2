import Login from './Login';
import axios from 'axios'; 
import React, {useEffect }  from 'react';
import { BrowserRouter, Routes, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';

function App() {
  //const [IsLogin, setIsLogin] = useReact.useState(false);
  useEffect(() => {
    axios.get('/api/user_inform')
      .then(res => console.log(res))
      .catch(err => console.log(err))
  })
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
