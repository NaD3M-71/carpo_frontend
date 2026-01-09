import { Link } from 'react-router-dom'
import type { Torneo } from '../../types/Torneo'
import { useAuth } from '../../context/AuthContext'

interface Props {
  torneo: Torneo
  estado: 'ABIERTO' | 'CERRADO'
}


const TorneoCard = ({ torneo, estado }: Props) => {
  const { user } = useAuth()

  return (
    <div className="flex flex-col justify-between rounded-xl bg-white/10 p-4 text-white hover:bg-white/20 transition">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{torneo.nombre}</h3>
        <p className="text-sm opacity-80">
          {new Date(torneo.fechaInicio).toLocaleDateString()}
        </p>
        <p className="text-sm opacity-70">{torneo.lugar}</p>
        <p className="text-xs uppercase opacity-60">
          {torneo.modalidad}
        </p>
      </div>

      <Link
        to={`/torneos/${torneo.id}`}
        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-center text-sm font-semibold hover:bg-red-700 transition"
      >
        {estado === 'ABIERTO'
          ? user
            ? 'Ver torneo'
            : 'Ingresá para más info'
          : 'Ver resultados'}
      </Link>
    </div>
  )
}

export default TorneoCard
