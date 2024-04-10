import React, { useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (

    <Router>
      <Routes>
        {/*如果未登录直接访问 Home 页面，则跳转至登录页面*/}
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Login onLogin={handleLoginSuccess} />} />
        <Route path="/home" element={isLoggedIn ? <Home /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;