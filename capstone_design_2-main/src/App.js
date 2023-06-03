import React, { useEffect } from 'react';
import { Route, BrowserRouter, Routes, Switch, Link } from 'react-router-dom';
import axios from 'axios';

import LectureList from './components/lecture/pages/LectureList';
import AttendenceCheck from './components/lecture/pages/AttendenceCheck';
import ModifyAttendence from './components/lecture/pages/ModifyAttendence.js'
import Live from './components/lecture/live/Live.js'
import Login from './LoginPage.js'
// import Dashboard from './components/lectures/pages/Dashboard';

function App() {
  // useEffect(() => {
  //   axios.get('/api/test')
  //     .then(res => console.log(res))
  // })


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          {/* <Route path="/dashboard" element={<Dashboard IsLogin={IsLogin} />} /> */}
          <Route exact path=':prfid/lectures' element={<LectureList />}></Route>
          <Route path='/:id' element={<AttendenceCheck />}></Route>
          <Route path='/:id/edit' element={<ModifyAttendence />}></Route>
          {/* <Route exact path='/' element={<Live />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}



export default App;