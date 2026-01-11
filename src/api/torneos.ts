import type { CategoriasResponse } from '../types/CategoriaEspecifica'
import type { Arquero, Participacion, ParticipacionesResponse } from '../types/Participaciones'
import type { Arqueros } from '../types/Arquero'
import type { Torneo, TorneosResponse } from '../types/Torneo'
import api from './axios'


export const getTorneos = async (): Promise<Torneo[]> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/torneos`)

  if (!res.ok) {
    throw new Error('Error al obtener torneos')
  }

  const data: TorneosResponse = await res.json()
  return data.torneos
}

export const getTorneoById = async (id: number): Promise<Torneo> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/torneos/${id}`)
  if (!res.ok) {
    throw new Error('Error al obtener torneo')
  }
  const data: TorneosResponse = await res.json()
  return data.torneo
}


export const getInscriptos = async (
  torneoId: number
): Promise<Participacion[]> => {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/participaciones/torneo/${torneoId}`
  )

  if (!res.ok) {
    throw new Error('Error al obtener participaciones del torneo')
  }

  const data: ParticipacionesResponse = await res.json()
  return data.participaciones
}


export interface InscripcionPayload {
  torneoId: number
  arqueroId: number
  categoriaEspecificaId: number
  tipoArco: string
  sexo: string
}

export const inscribirseATorneo = async (
  payload: InscripcionPayload,
) => {
  const { data } = await api.post(
    `${import.meta.env.VITE_API_URL}/participaciones`,
    payload
  )

  return data
}

export const desinscribirseDelTorneo = async (
  torneoId: number,
  arqueroId: number
) => {
  const { data } = await api.delete(
    `${import.meta.env.VITE_API_URL}/participaciones/${torneoId}/${arqueroId}`
  )
  return data
}

export const getCategoriasPorModalidad = async (modalidad: string) => {
  const res  = await fetch(
    `${import.meta.env.VITE_API_URL}/torneos/categorias/${modalidad}`
  )
  const data : CategoriasResponse = await res.json()
  return data.categoriasEspecificas
}

export const getArqueros = async ()=>{
  const res = await fetch(`${import.meta.env.VITE_API_URL}/arqueros`)

  if (!res.ok) {
    throw new Error('Error al obtener arqueros')
  }

  const data: Arquero = await res.json()
  return data.arqueros

}

export const getArqueroById = async (id: number): Promise<Arqueros> => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/arqueros/${id}`)
  if (!res.ok) {
    throw new Error('Error al obtener arquero')
  }
  const data: Arqueros = await res.json()
  return data.arquero
}