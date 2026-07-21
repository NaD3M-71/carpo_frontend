import { useEffect, useState } from 'react'
import { getTorneos } from '../api/torneos'
import type { Torneo } from '../types/Torneo'
import TorneosSection from '../components/torneos/TorneosSection'
import FormTorneo from '../components/torneos/FormTorneo'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const TorneosIndex = () => {
  const { user } = useAuth()
  const esAdmin = user?.rol === 'ADMIN' || user?.rol === 'SUPERADMIN'

  const [torneos, setTorneos] = useState<Torneo[]>([])
  const [loading, setLoading] = useState(true)
  const [modalAbierto, setModalAbierto] = useState(false)
  const [torneoEditando, setTorneoEditando] = useState<Torneo | undefined>(undefined)

  const fetchTorneos = async () => {
    try {
      const data = await getTorneos()
      setTorneos(data)
    } catch (error) {
      console.error('Error cargando torneos', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTorneos()
  }, [])

  const abrirCrear = () => {
    setTorneoEditando(undefined)
    setModalAbierto(true)
  }

  const abrirEditar = (torneo: Torneo) => {
    setTorneoEditando(torneo)
    setModalAbierto(true)
  }

  const cerrarModal = () => {
    setModalAbierto(false)
    setTorneoEditando(undefined)
  }

  if (loading) {
    return <p className="text-center text-white">Cargando torneos...</p>
  }

  const abiertos = torneos.filter(t => t.estado === 'ABIERTO')
  const cerrados = torneos.filter(t => t.estado === 'CERRADO')

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-16">
      <div className="flex flex-wrap items-center gap-3">
        <Link
          to={'/copa-carpo'}
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Ver Resultados Copa CARPO
        </Link>

        {esAdmin && (
          <button
            type="button"
            onClick={abrirCrear}
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            + Crear torneo
          </button>
        )}
      </div>

      <TorneosSection
        titulo="Torneos Abiertos"
        torneos={abiertos}
        estado="ABIERTO"
        onEdit={esAdmin ? abrirEditar : undefined}
      />

      <TorneosSection
        titulo="Torneos Cerrados"
        torneos={cerrados}
        estado="CERRADO"
        onEdit={esAdmin ? abrirEditar : undefined}
      />

      {modalAbierto && (
        <FormTorneo
          torneo={torneoEditando}
          onClose={cerrarModal}
          onSuccess={fetchTorneos}
        />
      )}
    </div>
  )
}

export default TorneosIndex
