import type { TipoArco } from './TipoArco'

export interface RankingItem {
  posicion: number
  arqueroId: number
  arquero: string
  sexo: 'MASCULINO' | 'FEMENINO'
  puntosTotal: number
  torneosParticipados: number
}

export interface RankingCategoria {
  total: number
  ranking: RankingItem[]
}

export interface RankingResponse {
  anio: number
  tipoArco: TipoArco
  filtroSexo: 'MASCULINO' | 'FEMENINO' | 'Todos'
  senior: RankingCategoria
  escuela: RankingCategoria
}
