import React from 'react'
import NavbarTop from './Components/NavbarTop'
import {Route, Routes} from 'react-router-dom'
import Login from './Components/Login'
import Register from './Components/Register'
import Dashboard from './Components/Dashboard'
import ProtectedDashboard from './Components/ProtectedDashboard'
import Store from './Components/Store'
function App() {
  return (
    <div>
      <NavbarTop/>

      <Routes>
      
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<ProtectedDashboard>
        <Dashboard/>
      </ProtectedDashboard>} />
      <Route path='/store' element={<Store/>}/>
      </Routes>
    </div>
  )
}

export default App