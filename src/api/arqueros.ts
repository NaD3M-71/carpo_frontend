import api from './axios'
import type { ArqueroCompleto, ArqueroPublico, ListadoArquerosResponse } from '../types/Arquero'

export interface PerfilPayload {
  nombre: string
  apellido: string
  bio: string
  tipoArco: string
  lateralidad: string
  categoriaGeneral: string
  sexo: string
  telefono: string
  direccion: string
  fechaNacimiento: string
}

export const actualizarPerfil = async (payload: Partial<PerfilPayload>) => {
  const { data } = await api.put('/arqueros/me', payload)
  return data
}

export const getMe = async () => {
  const { data } = await api.get('/arqueros/me')
  return data
}

export const getArquerosPaginado = async (
  page: number,
  search?: string
): Promise<ListadoArquerosResponse> => {
  const { data } = await api.get('/arqueros', {
    params: { page, search: search || undefined }
  })
  return data
}

export const getArqueroPublico = async (id: number): Promise<ArqueroPublico> => {
  const { data } = await api.get(`/arqueros/${id}`)
  return data.arquero
}

export const getArqueroCompleto = async (id: number): Promise<ArqueroCompleto> => {
  const { data } = await api.get(`/arqueros/${id}/completo`)
  return data.arquero
}
