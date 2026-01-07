export interface Torneo {
  id: number
  nombre: string
  descripcion: string
  modalidad: string
  fechaInicio: string
  fechaFin: string
  fechaLimiteInscripcion: string | null
  lugar: string
  esCopaCARPO: boolean
  anio: number
  estado: string
  activo: boolean
}

export interface TorneosResponse {
  total: number
  torneos: Torneo[]
}
