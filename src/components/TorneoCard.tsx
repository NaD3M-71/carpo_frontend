import type { Torneo } from '../types/Torneo'
import { useAuth } from '../context/AuthContext'

interface Props {
  torneo: Torneo
}

const TorneoCard = ({ torneo }: Props) => {
  const { user } = useAuth()

  return (
    <div className="flex h-full flex-col justify-between rounded-xl bg-white/10 p-4 text-white transition hover:bg-white/20">
      
      <div>
        <h3 className="text-lg font-semibold">{torneo.nombre}</h3>
        <p className="text-sm opacity-80">
          {new Date(torneo.fechaInicio).toLocaleDateString()}
        </p>
        <p className="text-sm opacity-70">{torneo.lugar}</p>
      </div>

      <button
        className={`mt-4 rounded-lg px-4 py-2 text-sm font-semibold transition
          ${
            user
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-white/20 hover:bg-white/30'
          }`}
      >
        {user ? 'Inscribirme' : 'Ingresá para inscribirte'}
      </button>
    </div>
  )
}

export default TorneoCard
