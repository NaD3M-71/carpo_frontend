import { Link } from 'react-router-dom'
import type { Torneo } from '../../types/Torneo'
import { useAuth } from '../../context/AuthContext'

interface Props {
  torneo: Torneo
  estado: 'ABIERTO' | 'CERRADO'
  onEdit?: (torneo: Torneo) => void
}


const TorneoCard = ({ torneo, estado, onEdit }: Props) => {
  const { user } = useAuth()
  const esAdmin = user?.rol === 'ADMIN' || user?.rol === 'SUPERADMIN'

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

      <div className="mt-4 flex gap-2">
        <Link
          to={`/torneos/${torneo.id}`}
          className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-center text-sm font-semibold hover:bg-red-700 transition"
        >
          {estado === 'ABIERTO'
            ? user
              ? 'Ver torneo'
              : 'Ingresá para más info'
            : 'Ver resultados'}
        </Link>

        {esAdmin && onEdit && (
          <button
            type="button"
            onClick={() => onEdit(torneo)}
            className="rounded-lg bg-white/20 px-3 py-2 text-sm font-semibold hover:bg-white/30 transition"
          >
            Editar
          </button>
        )}
      </div>
    </div>
  )
}

export default TorneoCard
