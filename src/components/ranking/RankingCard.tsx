import type { RankingCategoria } from '../../types/Rankings'
import RankingList from './RankingList'
import { useRankingBySexo } from './useRankingBySexo'

interface Props {
  titulo: string
  categoria: RankingCategoria
  limit?: number
}

const RankingCard = ({ titulo, categoria, limit }: Props) => {
  console.log('categoria.ranking:', categoria.ranking);
  const escuela = categoria.ranking.filter(
    r => r.categoria === 'ESCUELA'
  )
  console.log('escuela:', escuela);
  const { masculino, femenino } = useRankingBySexo(
    categoria.ranking.filter(r => r.categoria !== 'ESCUELA'),
    { limit }
  )

   return (
    <div className="w-80 rounded-xl bg-black/70 p-5 text-white">
      <h3 className="mb-4 text-center text-lg font-bold">
        {titulo}
      </h3>

      {/* ESCUELA */}
      {escuela.length > 0 && (
        <div className="mb-6 border-b border-white/20 pb-4">
          <RankingList titulo="Escuela" items={escuela} />
        </div>
      )}

      {/* MASCULINO */}
      <div className="mb-4">
        <RankingList titulo="Masculino" items={masculino} />
      </div>

      {/* FEMENINO */}
      <RankingList titulo="Femenino" items={femenino} />
    </div>
  )
}

export default RankingCard
