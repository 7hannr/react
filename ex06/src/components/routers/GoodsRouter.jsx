import ListPage from '../goods/ListPage'
import SearchPage from '../goods/SearchPage'
import { Route,Routes } from 'react-router-dom'
import UpdatePage from '../goods/UpdatePage'
import ReadPage from '../goods/ReadPage'

const GoodsRouter = () => {
  return (
    <Routes>
      <Route path='search' element={<SearchPage/>}></Route>
      <Route path='list' element={<ListPage/>}></Route>
      <Route path='update/:gid' element={<UpdatePage/>}></Route>
      <Route path='read/:gid' element={<ReadPage/>}></Route>
    </Routes>
  )
}

export default GoodsRouter