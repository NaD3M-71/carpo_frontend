
import api from "./axios"

// services/resultados.ts
interface PuntajePayload {
  id: number
  puntajeClasificacion?: number
  posicionClasificacion?: number
  posicionFinal?: number
  medalla?: 'ORO' | 'PLATA' | 'BRONCE'
  esMejorClasificacion?: boolean
  puntosExtra?: number
}

export const guardarResultados = async (
  torneoId: number,
  puntajes: PuntajePayload[]
) => {
  try{
  const { data } = await api.patch(
    `/participaciones/${torneoId}/resultados`,
    { puntajes }
  )

  return data
}catch (error) {
    console.error(error)
    throw new Error('Error al guardar resultados')
  }
}


export const getResultados = async (anio :number) =>{
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/participaciones/tabla-general/${anio}`
  )

  return res.json()
}