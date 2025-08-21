// client/src/App.jsx
import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SearchPage from "./pages/searchPage.jsx"
import CourtDetailPage from "./pages/courtDetailPage.jsx"
import './App.css'
import TestAuth from './TestAuth'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/courts/:id" element={<CourtDetailPage />} />
        </Routes>
      </BrowserRouter>
      <TestAuth />
    </>
  )
}

export default App
