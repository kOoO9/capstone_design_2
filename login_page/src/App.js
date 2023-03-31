import Login from './Login';
import axios from 'axios'; 
import React, {useEffect }  from 'react';

function App() {
  
  useEffect(() => {
    axios.get('/api/user_inform')
      .then(res => console.log(res))
      .catch()
  })
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
