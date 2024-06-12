import React from 'react'
import { Routes,Route} from 'react-router-dom'
import ReadPage from '../bbs/ReadPage'
import ListPage from '../bbs/ListPage'
import InsertPage from '../bbs/InsertPage'
import UpdatePage from '../bbs/UpdatePage'

const BBSRouter = () => {
  return (
    <Routes>
        <Route path="list" element={<ListPage/>}/>
        <Route path="read/:bid" element={<ReadPage/>}/>
        <Route path="insert" element={<InsertPage/>}/>
        <Route path="update/:bid" element={<UpdatePage/>}/>
    </Routes>
  )
}

export default BBSRouter