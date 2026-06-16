import api from './axios'

export interface Galeria {
  id: number
  titulo: string
  descripcion?: string | null
  link: string
}

export const getGalerias = async (): Promise<Galeria[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/galerias`)
  if (!res.ok) throw new Error('Error al obtener galerías')
  const data = await res.json()
  return data.galerias
}

export const crearGaleria = async (payload: Omit<Galeria, 'id'>): Promise<Galeria> => {
  const { data } = await api.post('/galerias', payload)
  return data.galeria
}

export const actualizarGaleria = async (id: number, payload: Partial<Omit<Galeria, 'id'>>): Promise<Galeria> => {
  const { data } = await api.put(`/galerias/${id}`, payload)
  return data.galeria
}

export const eliminarGaleria = async (id: number): Promise<void> => {
  await api.delete(`/galerias/${id}`)
}
