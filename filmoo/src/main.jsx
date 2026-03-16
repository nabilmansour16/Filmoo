import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Pages/Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import PageP from './Pages/PageP.jsx'

createRoot(document.getElementById('root')).render(
 
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/movie' element={<PageP/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
