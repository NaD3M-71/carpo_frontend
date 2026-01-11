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
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/participaciones/${torneoId}/resultados`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ puntajes })
    }
  )

  if (!res.ok) {
    throw new Error('Error al guardar resultados')
  }

  return res.json()
}
