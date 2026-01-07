import type { RankingCategoria } from '../../types/Rankings'
import RankingList from './RankingList'
import { useRankingBySexo } from './useRankingBySexo'

interface Props {
  titulo: string
  categoria: RankingCategoria
  limit?: number
}

const RankingCard = ({ titulo, categoria, limit }: Props) => {
  const { masculino, femenino } = useRankingBySexo(
    categoria.ranking,
    { limit }
  )

  return (
    <div className="w-80 rounded-xl bg-black/70 p-5 text-white">
      <h3 className="mb-4 text-center text-lg font-bold">
        {titulo}
      </h3>

      <div className="mb-4">
        <RankingList titulo="Masculino" items={masculino} />
      </div>

      <RankingList titulo="Femenino" items={femenino} />
    </div>
  )
}

export default RankingCard
