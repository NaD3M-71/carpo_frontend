import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import './App.css'
import Home from './pages/Home'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/Login'

function App() {


  return (
    
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* <Route path="/torneos" element={<Torneos />} />
        <Route path="/arqueros" element={<Arqueros />} />*/}
        <Route path="/login" element={<Login />} /> 
      </Route>
    </Routes>

  )
  
}

export default App
