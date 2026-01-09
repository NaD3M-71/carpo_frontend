export type EstadoTorneo = 'ABIERTO' | 'CERRADO'

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
  estado: EstadoTorneo
  activo: boolean
}

export interface TorneosResponse {
  total: number
  torneos: Torneo[]
  torneo: Torneo
}
