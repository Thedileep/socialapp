import React, { useState } from 'react';
import './App.css';
import Login from './components/./account/Login'; 
import SignUp from './components/./account/SignUp';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  const [loggedIn, setLoggedIn] = useState(false); 
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={loggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignUp onSignUp={handleLogin} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
