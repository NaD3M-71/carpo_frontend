export interface ParticipacionesResponse {
  total: number
  participaciones: Participacion[]
}

export interface Participacion {
  id: number
  arqueroId: number
  torneoId: number
  categoriaEspecificaId: number
  tipoArco: string
  sexo: string
  puntajeClasificacion: number | null
  posicionClasificacion: number | null
  esMejorClasificacion: boolean
  posicionFinal: number | null
  medalla: string | null
  puntosBase: number
  puntosExtra: number
  puntosTotal: number
  createdAt: string
  updatedAt: string
  arquero: Arquero
  categoriaEspecifica: CategoriaEspecifica
}

export interface Arquero {
  id: number
  nombre: string
  apellido: string
  tipoArco: string
  categoriaGeneral: string
  sexo: string
  arqueros: Arquero[]
}

export interface CategoriaEspecifica {
  id: number
  nombre: string
  categoriaGeneral: string
  requiereSexo: boolean
  distancia: number | null
}
