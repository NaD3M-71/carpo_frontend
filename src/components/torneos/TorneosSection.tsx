import TorneoCard2 from './TorneoCard2'
import type { Torneo } from '../../types/Torneo'

interface Props {
  titulo: string
  torneos: Torneo[]
  estado: 'ABIERTO' | 'CERRADO'
}

const TorneosSection = ({ titulo, torneos, estado }: Props) => {
  if (torneos.length === 0) {
    return (
      <section>
        <h2 className="mb-6 text-2xl font-bold text-white">{titulo}</h2>
        <p className="text-white/70">
          No hay torneos {estado === 'ABIERTO' ? 'abiertos' : 'cerrados'}.
        </p>
      </section>
    )
  }

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-white">{titulo}</h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {torneos.map(torneo => (
          <TorneoCard2
            key={torneo.id}
            torneo={torneo}
            estado={estado}
          />
        ))}
      </div>
    </section>
  )
}

export default TorneosSection
