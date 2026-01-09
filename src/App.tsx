import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import TorneosIndex from './pages/Torneos'
import TorneosDetalle from './pages/TorneoDetalle'
import InscripcionTorneo from './pages/InscripcionTorneo'
import InscribirArqueros from './pages/InscribirArqueros'
import { useAuth } from './context/AuthContext'
import type { JSX } from 'react'

function App() {
  const AdminRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useAuth()

    if (!user) return <Navigate to="/" replace />
    if (user.rol !== 'ADMIN' && user.rol !== 'SUPERADMIN') {
      return <Navigate to="/" replace />
    }

    return children
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route path="/torneos" element={<TorneosIndex />} />
        <Route path="/torneos/:id" element={<TorneosDetalle />} />
        <Route path="/torneos/:id/inscribirse" element={<InscripcionTorneo />} />

        <Route
          path="/torneos/:id/admin/inscribir"
          element={
            // <AdminRoute>
              <InscribirArqueros />
            //</AdminRoute>
          }
        />
      </Route>
    </Routes>
  )
}

export default App
