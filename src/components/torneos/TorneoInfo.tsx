import type { Torneo } from '../../types/Torneo'

const TorneoInfo = ({ torneo }: { torneo: Torneo }) => {

  return (
    <div className="rounded-xl bg-white/10 p-6 text-white space-y-2">
      <h1 className="text-3xl font-bold">{torneo.nombre}</h1>
      <p className="opacity-80">{torneo.descripcion}</p>

      <div className="flex flex-wrap gap-6 text-sm opacity-80">
        <span>📅 {new Date(torneo.fechaInicio).toLocaleDateString()}</span>
        <span>📍 {torneo.lugar}</span>
        <span>🏹 {torneo.modalidad}</span>
        <span>Estado: {torneo.estado}</span>
      </div>
    </div>
  )
}

export default TorneoInfo
