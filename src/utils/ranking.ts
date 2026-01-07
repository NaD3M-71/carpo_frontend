import type { RankingItem } from '../types/Rankings'

export const separarPorSexoTop3 = (ranking: RankingItem[]) => {
  const masculino = ranking
    .filter(r => r.sexo === 'MASCULINO')
    .slice(0, 3)

  const femenino = ranking
    .filter(r => r.sexo === 'FEMENINO')
    .slice(0, 3)

  return { masculino, femenino }
}
