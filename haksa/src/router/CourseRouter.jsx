import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Listpage from '../components/course/Listpage'
import InsertPage from '../components/course/InsertPage'
import ReadPage from '../components/course/ReadPage'
import UpdatePage from '../components/course/UpdatePage'

const CourseRouter = () => {
  return (
    <Routes>
    <Route path="" element={<Listpage/>}/>
    <Route path="/insert" element={<InsertPage/>}/>
    <Route path="/read/:lcode" element={<ReadPage/>}/>
    <Route path="/update/:lcode" element={<UpdatePage/>}/>
    </Routes>
  )
}

export default CourseRouter