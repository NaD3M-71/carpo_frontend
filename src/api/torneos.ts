import type { Torneo, TorneosResponse } from '../types/Torneo'


const API_URL = 'http://localhost:4000/api'

export const getTorneos = async (): Promise<Torneo[]> => {
  const res = await fetch(`${API_URL}/torneos`)

  if (!res.ok) {
    throw new Error('Error al obtener torneos')
  }

  const data: TorneosResponse = await res.json()
  return data.torneos
}
