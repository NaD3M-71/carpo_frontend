import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getTorneoById } from '../api/torneos'
import TorneoInfo from '../components/torneos/TorneoInfo'
import FormInscripcionTorneo from '../components/torneos/FormInscripcionTorneo'
import type { Torneo } from '../types/Torneo'

const InscripcionTorneo = () => {
  const { id } = useParams()
  const { user } = useAuth()
  const [torneo, setTorneo] = useState<Torneo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTorneo = async () => {
      try {
        const data = await getTorneoById(Number(id))
        setTorneo(data)
      } catch (error) {
        console.error('Error al cargar torneo', error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchTorneo()
  }, [id])

  if (loading) {
    return <p>Cargando torneo...</p>
  }

  if (!torneo) {
    return <p>No se pudo cargar el torneo.</p>
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">
        Inscripción al torneo
      </h1>

      {/* Info del torneo */}
      <TorneoInfo torneo={torneo} />

      {/* Formulario (solo si está logueado) */}
      {user && (
        <FormInscripcionTorneo
          torneoId={torneo.id}
          modalidad={torneo.modalidad}
        />
      )}
    </div>
  )
}

export default InscripcionTorneo
