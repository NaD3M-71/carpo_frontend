import type { RankingItem } from '../../types/Rankings'

interface Props {
  titulo: string
  items: RankingItem[]
}

const RankingList = ({ titulo, items }: Props) => {
  return (
    <div>
      <h4 className="mb-2 text-sm font-semibold text-white/80">
        {titulo}
      </h4>

      {items.length === 0 ? (
        <p className="text-sm opacity-60">Sin datos</p>
      ) : (
        <ul className="space-y-1 text-sm">
          {items.map(p => (
            <li key={p.arqueroId} className="flex justify-between">
              <span>{p.posicion}. {p.arquero}</span>
              <span className="opacity-70">{p.puntosTotal} pts</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default RankingList
