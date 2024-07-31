import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CgvPage from '../components/crawl/CgvPage'
import FinancePage from '../components/crawl/FinancePage'
import GmarketPage from '../components/crawl/GmarketPage'

const CrawlRouter = () => {
  return (
    <Routes>
      <Route path="cgv" element={<CgvPage/>}/>
      <Route path="finance" element={<FinancePage/>}/>
      <Route path="gmarket" element={<GmarketPage/>}/>
    </Routes>
  )
}

export default CrawlRouter