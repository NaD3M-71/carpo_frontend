import { useEffect, useState } from 'react'
import { getTorneos } from '../api/torneos'
import type { Torneo } from '../types/Torneo'
import TorneosSection from '../components/torneos/TorneosSection'

const TorneosIndex = () => {
  const [torneos, setTorneos] = useState<Torneo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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

    fetchTorneos()
  }, [])

  if (loading) {
    return <p className="text-center text-white">Cargando torneos...</p>
  }

const abiertos = torneos.filter(t => t.estado === 'ABIERTO')
const cerrados = torneos.filter(t => t.estado === 'CERRADO')

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 space-y-16">
      <TorneosSection
        titulo="Torneos Abiertos"
        torneos={abiertos}
        estado="ABIERTO"
      />

      <TorneosSection
        titulo="Torneos Cerrados"
        torneos={cerrados}
        estado="CERRADO"
      />

    </div>
  )
}

export default TorneosIndex
