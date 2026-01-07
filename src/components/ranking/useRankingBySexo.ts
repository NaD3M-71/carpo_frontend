import type { RankingItem } from '../../types/Rankings'

interface Options {
  limit?: number
}

export const useRankingBySexo = (
  ranking: RankingItem[],
  options: Options = {}
) => {
  const { limit } = options

  const masculino = ranking
    .filter(r => r.sexo === 'MASCULINO')
    .slice(0, limit)

  const femenino = ranking
    .filter(r => r.sexo === 'FEMENINO')
    .slice(0, limit)

  return { masculino, femenino }
}
