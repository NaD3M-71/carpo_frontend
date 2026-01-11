import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getInscriptos } from '../../api/torneos'
import { guardarResultados } from '../../api/resultados'
import type { Participacion } from '../../types/Participaciones'

type ResultadoForm = {
  puntajeClasificacion?: number
  posicionClasificacion?: number
  posicionFinal?: number
  esMejorClasificacion?: boolean
  medalla?: 'ORO' | 'PLATA' | 'BRONCE'
  puntosExtra?: number
}

const ResultadosTorneo = () => {
  const { id } = useParams()
  const torneoId = Number(id)

  const [inscriptos, setInscriptos] = useState<Participacion[]>([])
  const [resultados, setResultados] = useState<
    Record<number, ResultadoForm>
  >({})
  const [loading, setLoading] = useState(true)

useEffect(() => {
  const fetchData = async () => {
    const data = await getInscriptos(torneoId)
    setInscriptos(data)

    const inicial: Record<number, ResultadoForm> = {}

    data.forEach(p => {
      inicial[p.id] = {
        puntajeClasificacion: p.puntajeClasificacion ?? undefined,
        posicionClasificacion: p.posicionClasificacion ?? undefined,
        posicionFinal: p.posicionFinal ?? undefined,
        esMejorClasificacion: p.esMejorClasificacion ?? false,
        medalla: p.medalla ?? null,
        puntosExtra: p.puntosExtra ?? undefined
      }
    })

    setResultados(inicial)
    setLoading(false)
  }

  fetchData()
}, [torneoId])


  const handleChange = (
    participacionId: number,
    field: keyof ResultadoForm,
    value: any
  ) => {
    setResultados(prev => ({
      ...prev,
      [participacionId]: {
        ...prev[participacionId],
        [field]: value
      }
    }))
  }

  const handleGuardar = async () => {
    const payload = Object.entries(resultados).map(
      ([id, data]) => ({
        id: Number(id),
        ...data
      })
    )

    await guardarResultados(torneoId, payload)
    alert('Resultados guardados correctamente')
  }

  if (loading) return <p>Cargando...</p>

  return (
    <div className="overflow-x-auto">
      <h2 className="mb-4 text-lg font-semibold">
        Carga de resultados
      </h2>

      <table className="w-full border text-sm bg-white">
        <thead className="bg-sky-50">
          <tr>
            <th className="border px-2 py-1">Arquero</th>
            <th className="border px-2 py-1">Clasif.</th>
            <th className="border px-2 py-1">Pos. Clasif.</th>
            <th className="border px-2 py-1">Pos. Final</th>
            <th className="border px-2 py-1">Mejor</th>
            <th className="border px-2 py-1">Medalla</th>
            <th className="border px-2 py-1">Puntos Extra</th>
          </tr>
        </thead>

        <tbody>
          {inscriptos.map(p => (
            <tr key={p.id} className="even:bg-sky-50/50">
              <td className="border px-2 py-1">
                {p.arquero.apellido}, {p.arquero.nombre}
              </td>

              <td className="border px-2 py-1">
                <input
                  type="number"
                  className="w-20 border px-1"
                  value={resultados[p.id]?.puntajeClasificacion ?? ''}
                  onChange={e =>
                    handleChange(
                      p.id,
                      'puntajeClasificacion',
                      e.target.value === '' ? undefined : Number(e.target.value)
                    )
                  }
                />

              </td>

              <td className="border px-2 py-1">
                <input
                  type="number"
                  className="w-16 border px-1"
                  onChange={e =>
                    handleChange(
                      p.id,
                      'posicionClasificacion',
                      Number(e.target.value)
                    )
                  }
                />
              </td>

              <td className="border px-2 py-1">
                <input
                  type="number"
                  className="w-16 border px-1"
                  onChange={e =>
                    handleChange(
                      p.id,
                      'posicionFinal',
                      Number(e.target.value)
                    )
                  }
                />
              </td>

              <td className="border px-2 py-1 text-center">
                <input
                  type="checkbox"
                  checked={resultados[p.id]?.esMejorClasificacion ?? false}
                  onChange={e =>
                    handleChange(
                      p.id,
                      'esMejorClasificacion',
                      e.target.checked
                    )
                  }
                />
              </td>

              <td className="border px-2 py-1">
                <select
                  className="border"
                  value={resultados[p.id]?.medalla ?? ''}
                  onChange={e =>
                    handleChange(
                      p.id,
                      'medalla',
                      e.target.value === '' ? undefined : e.target.value
                    )
                  }
                >
                  <option value="">-</option>
                  <option value="ORO">ORO</option>
                  <option value="PLATA">PLATA</option>
                  <option value="BRONCE">BRONCE</option>
                </select>
              </td>

              <td className="border px-2 py-1">
                <input
                  type="number"
                  className="w-16 border px-1"
                  value={resultados[p.id]?.puntosExtra ?? ''}
                  onChange={e =>
                    handleChange(
                      p.id,
                      'puntosExtra',
                      e.target.value === '' ? undefined : Number(e.target.value)
                    )
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        type='submit'
        onClick={handleGuardar}
        className="mt-4 rounded bg-sky-600 px-4 py-2 text-white hover:bg-sky-700"
      >
        Guardar resultados
      </button>
    </div>
  )
}

export default ResultadosTorneo
