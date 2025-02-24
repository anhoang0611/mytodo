import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Todos from './components/Todos.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Toaster position="top-center" />
    <BrowserRouter>
      
      <Routes>               
        <Route path="/" element={<Todos />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
