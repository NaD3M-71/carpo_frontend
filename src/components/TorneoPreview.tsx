import { useEffect, useState } from 'react'
import { getTorneos } from '../api/torneos'
import type { Torneo } from '../types/Torneo'
import TorneoCard from './TorneoCard'

const TorneosPreview = () => {
  const [proximos, setProximos] = useState<Torneo[]>([])
  const [pasados, setPasados] = useState<Torneo[]>([])

  useEffect(() => {
    const cargarTorneos = async () => {
      try {
        const torneos = await getTorneos()
        const hoy = new Date()

        const proximosTorneos = torneos
          .filter(t => new Date(t.fechaInicio) >= hoy && t.activo)
          .sort(
            (a, b) =>
              +new Date(a.fechaInicio) - +new Date(b.fechaInicio)
          )
          .slice(0, 2)

        const torneosPasados = torneos
          .filter(t => new Date(t.fechaInicio) < hoy)
          .sort(
            (a, b) =>
              +new Date(b.fechaInicio) - +new Date(a.fechaInicio)
          )
          .slice(0, 3)

        setProximos(proximosTorneos)
        setPasados(torneosPasados)
      } catch (error) {
        console.error('Error cargando torneos', error)
      }
    }

    cargarTorneos()
  }, [])

  return (
    <div className="space-y-12">

      {/* Próximos */}
      <section>
        <div className="grid gap-4 md:grid-cols-2">
          {proximos.map(t => (
            <TorneoCard key={t.id} torneo={t} />
          ))}
        </div>
      </section>

      {/* Pasados */}
      {pasados.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-bold text-white/80">
            Torneos anteriores
          </h2>

          <div className="grid gap-3 md:grid-cols-3">
            {pasados.map(t => (
              <TorneoCard key={t.id} torneo={t} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

export default TorneosPreview
