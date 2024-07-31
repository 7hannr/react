import React from 'react'
import { Route,Routes } from 'react-router-dom'
import LoginPage from '../users/LoginPage'
import JoinPage from '../users/JoinPage'

const UserRouter = () => {
  return (
    <Routes>
        <Route path='login' element={<LoginPage/>}/>
        <Route path='join' element={<JoinPage/>}/>
    </Routes>
  )
}

export default UserRouter