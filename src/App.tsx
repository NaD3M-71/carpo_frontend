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
import ResultadosTorneo from './components/torneos/ResultadoTorneo'
import Registro from './pages/Registro'
import Arqueros from './pages/Arqueros'
import Galeria from './pages/Galeria'
import PerfilArquero from './pages/Perfil'
import CopaCarpoResultados from './pages/CopaCarpoResultados'

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
        <Route path="/registro" element={<Registro />} />
        <Route path="/arqueros" element={<Arqueros />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/perfil" element={<PerfilArquero />} />

        <Route path="/torneos" element={<TorneosIndex />} />
        <Route path="/copa-carpo" element={<CopaCarpoResultados />} />
        <Route path="/torneos/:id" element={<TorneosDetalle />} />
        <Route path="/torneos/:id/inscribirse" element={<InscripcionTorneo />} />

        <Route
          path="/torneos/:id/admin/inscribir"
          element={
            <AdminRoute>
              <InscribirArqueros />
            </AdminRoute>
          }
        />
        <Route
          path="/torneos/:id/admin/resultados"
          element={
            <AdminRoute>
              <ResultadosTorneo />
            </AdminRoute>
          }
        />
        </Route>
    </Routes>
  )
}

export default App
