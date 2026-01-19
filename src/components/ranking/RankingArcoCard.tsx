import { useEffect, useState } from 'react'
import type { TipoArco } from '../../types/TipoArco'
import type { RankingResponse } from '../../types/Rankings'


interface Props {
  tipoArco: TipoArco
}

const RankingArcoCard = ({ tipoArco }: Props) => {
  const [data, setData] = useState<RankingResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/participaciones/tabla-categoria/2026/${tipoArco}`
        )
        const json = await res.json()
        setData(json)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchRanking()
  }, [tipoArco])

  if (loading) {
    return (
      <div className="h-56 rounded-xl bg-black/50 animate-pulse" />
    )
  }

  if (!data) return null

  const masculino = data.senior.ranking
    .filter(r => r.sexo === 'MASCULINO')
    .slice(0, 3)

  const femenino = data.senior.ranking
    .filter(r => r.sexo === 'FEMENINO')
    .slice(0, 3)

  const escuela = data.escuela.ranking.slice(0, 3)

  return (
    <div className="h-full rounded-xl bg-black/70 p-4 m-4 text-white">
      <h3 className="mb-3 text-lg font-bold text-center">{tipoArco}</h3>


      <div>
        <p className="text-sm opacity-70 text-center">Masculino</p>
        {masculino.map((r, i) => (
          <p key={r.arqueroId}>
            {i + 1}. {r.arquero} ({r.puntosTotal})
          </p>
        ))}
      </div>

      <div className="mt-3 border-y border-white/10 py-2">
        <p className="text-sm opacity-70 text-center">Femenino</p>
        {femenino.map((r, i) => (
          <p key={r.arqueroId}>
            {i + 1}. {r.arquero} ({r.puntosTotal})
          </p>
        ))}
      </div>
      {escuela.length > 0 && (
        <div className="mb-3">
          <p className="text-sm opacity-70 text-center">Escuela</p>
          {escuela.map((r, i) => (
            <p key={r.arqueroId}>
              {i + 1}. {r.arquero} ({r.puntosTotal})
            </p>
          ))}
        </div>
      )}
      <div>
        {/* <Link className='rounded-xl bg-red-600 text-white m-auto mt-4 p-5' to='#'>Ver Todos</Link> */}
      </div>
    </div>
  )
}

export default RankingArcoCard
