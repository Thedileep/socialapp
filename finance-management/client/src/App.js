import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from './components/spinners';
import Login from './pages/Login';
import Register from './pages/Register';
import HomePage from './pages/HomePage';
import Profile from './pages/Profile';

import Expense from './pages/Expense/Expense';
import Income from './pages/Income/Income';

import Protected from './components/Protected';
import Public from './components/Public';


const App = () => {
  
  const { loading } = useSelector(state => state.alerts);
  

  return (
    <BrowserRouter>
      {loading ? <Spinner /> :
        <Routes>
          <Route path='/' element={<Protected><HomePage/></Protected>}/>
          <Route path='/profile/:id' element={<Protected><Profile /></Protected>} />
          
          <Route path='/expense-tracking' element={<Protected> <Expense/></Protected>}/>
          <Route path='/income-management' element={<Protected> <Income/></Protected>}/>
         
          <Route path="/login" element={<Public><Login /></Public>} />
          <Route path="/register" element={<Public><Register /></Public>} />
        </Routes>
      }
    </BrowserRouter>
  )
};

export default App;