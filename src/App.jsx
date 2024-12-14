import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from "./components/Pages/Login/LoginPage"
import Dashboard from "./components/Pages/Dashboard/Dashboard"

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
      </Routes>
    </>
  )
}

export default App


