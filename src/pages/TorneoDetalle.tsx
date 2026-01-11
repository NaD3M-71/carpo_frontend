import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import {
  getTorneoById,
  getInscriptos,
  desinscribirseDelTorneo
} from '../api/torneos'

import type { Torneo } from '../types/Torneo'
import type { Participacion } from '../types/Participaciones'
import { useAuth } from '../context/AuthContext'

import TorneoInfo from '../components/torneos/TorneoInfo'
import InscriptosPorCategoria from '../components/torneos/InscriptosPorCategoria'

const TorneoDetalle = () => {
  const { id } = useParams()
  const { user } = useAuth()

  const [torneo, setTorneo] = useState<Torneo | null>(null)
  const [inscriptos, setInscriptos] = useState<Participacion[]>([])
  const [loading, setLoading] = useState(true)

  const esAdmin = user?.rol === 'ADMIN' || user?.rol === 'SUPERADMIN'
  const participacionDelUsuario = user
    ? inscriptos.find(p => p.arqueroId === user.id)
    : null

  const torneoAbierto = torneo?.estado === 'ABIERTO'

  const refetchInscriptos = async () => {
    const data = await getInscriptos(Number(id))
    setInscriptos(data)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const torneoData = await getTorneoById(Number(id))
        const inscriptosData = await getInscriptos(Number(id))

        setTorneo(torneoData)
        setInscriptos(inscriptosData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleDesinscribirse = async () => {
    if (!participacionDelUsuario) return

    const ok = confirm('¿Seguro que querés desinscribirte del torneo?')
    if (!ok) return

    try {
      await desinscribirseDelTorneo(
        participacionDelUsuario.torneoId,
        participacionDelUsuario.arqueroId
      )

      await refetchInscriptos()
    } catch (error) {
      console.error(error)
      alert('No se pudo desinscribir')
    }
  }

  if (loading) return <p className="text-white">Cargando torneo...</p>
  if (!torneo) return <p className="text-white">Torneo no encontrado</p>

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-16">
      {/* INFO + ACCIONES */}
      <section className="space-y-6">
        <TorneoInfo torneo={torneo} />

        {/* INSCRIPCIÓN USUARIO */}
        {user && torneoAbierto && !participacionDelUsuario && (
          <Link
            to={`/torneos/${torneo.id}/inscribirse`}
            className="inline-block px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
          >
            Inscribirme
          </Link>
        )}

        {/* DESINSCRIPCIÓN */}
        {user && torneoAbierto && participacionDelUsuario && (
          <button
            onClick={handleDesinscribirse}
            className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-semibold"
          >
            Desinscribirme
          </button>
        )}

        {/* ACCIONES ADMIN */}
        {esAdmin && (
          <div>
            <Link
              to={`/torneos/${torneo.id}/admin/inscribir`}
              className="inline-block px-6 py-2 mx-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold"
            >
              Inscribir arqueros
            </Link>
            <Link
              to={`/torneos/${torneo.id}/admin/resultados`}
              className="inline-block px-6 py-2 mx-2 bg-yellow-400 hover:bg-yellow-700 rounded-lg font-semibold"
            >
              Cargar resultados
            </Link>

          </div>
        )}

        {/* TORNEO CERRADO */}
        {user && !torneoAbierto && (
          <p className="text-sm text-white/70 italic">
            La inscripción está cerrada
          </p>
        )}
      </section>

      {/* INSCRIPTOS */}
      <InscriptosPorCategoria inscriptos={inscriptos} />
    </div>
  )
}

export default TorneoDetalle
