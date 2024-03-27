import {useEffect} from 'react'
import './App.css';
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';

import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom'



function App() {
  
  


  return (
    <div >
      <BrowserRouter>
      {/* < SessionExpirationNotifier/> */}
        <Routes>
          <Route path='/' element={<Navigate to='/auth' replace />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
