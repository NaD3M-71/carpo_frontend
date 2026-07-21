import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getInscriptos } from '../../api/torneos'
import { guardarResultados } from '../../api/resultados'
import type { Participacion } from '../../types/Participaciones'

type Medalla = 'ORO' | 'PLATA' | 'BRONCE'

type ResultadoForm = {
  puntajeClasificacion?: number
  posicionClasificacion?: number
  posicionFinal?: number
  esMejorClasificacion?: boolean
  medalla?: Medalla
  puntosExtra?: number
}

type Agrupados = Record<
  string, // tipoArco
  Record<
    string, // categoriaEspecifica.nombre
    Record<
      string, // sexo | 'UNISEX'
      Participacion[]
    >
  >
>

const FilaResultado = ({
  p,
  resultado,
  onChange,
}: {
  p: Participacion
  resultado: ResultadoForm
  onChange: (field: keyof ResultadoForm, value: ResultadoForm[keyof ResultadoForm]) => void
}) => (
  <tr className="even:bg-sky-50/50">
    <td className="border px-2 py-1">
      {p.arquero.apellido}, {p.arquero.nombre}
    </td>
    <td className="border px-2 py-1">
      <input
        type="number"
        title="Puntaje de clasificación"
        className="w-20 border px-1"
        value={resultado.puntajeClasificacion ?? ''}
        onChange={e =>
          onChange('puntajeClasificacion', e.target.value === '' ? undefined : Number(e.target.value))
        }
      />
    </td>
    <td className="border px-2 py-1">
      <input
        type="number"
        title="Posición de clasificación"
        className="w-16 border px-1"
        value={resultado.posicionClasificacion ?? ''}
        onChange={e =>
          onChange('posicionClasificacion', e.target.value === '' ? undefined : Number(e.target.value))
        }
      />
    </td>
    <td className="border px-2 py-1">
      <input
        type="number"
        title="Posición final"
        className="w-16 border px-1"
        value={resultado.posicionFinal ?? ''}
        onChange={e =>
          onChange('posicionFinal', e.target.value === '' ? undefined : Number(e.target.value))
        }
      />
    </td>
    <td className="border px-2 py-1 text-center">
      <input
        type="checkbox"
        title="Es mejor clasificación"
        checked={resultado.esMejorClasificacion ?? false}
        onChange={e => onChange('esMejorClasificacion', e.target.checked)}
      />
    </td>
    <td className="border px-2 py-1">
      <select
        title="Medalla"
        className="border"
        value={resultado.medalla ?? ''}
        onChange={e =>
          onChange('medalla', e.target.value === '' ? undefined : (e.target.value as Medalla))
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
        title="Puntos extra"
        className="w-16 border px-1"
        value={resultado.puntosExtra ?? ''}
        onChange={e =>
          onChange('puntosExtra', e.target.value === '' ? undefined : Number(e.target.value))
        }
      />
    </td>
  </tr>
)

const TablaGrupo = ({
  lista,
  resultados,
  onChangeResultado,
}: {
  lista: Participacion[]
  resultados: Record<number, ResultadoForm>
  onChangeResultado: (id: number, field: keyof ResultadoForm, value: ResultadoForm[keyof ResultadoForm]) => void
}) => (
  <div className="overflow-x-auto">
    <table className="w-full border text-sm bg-white">
      <thead className="bg-sky-50">
        <tr>
          <th className="border px-2 py-1 text-left">Arquero</th>
          <th className="border px-2 py-1">Clasif.</th>
          <th className="border px-2 py-1">Pos. Clasif.</th>
          <th className="border px-2 py-1">Pos. Final</th>
          <th className="border px-2 py-1">Mejor</th>
          <th className="border px-2 py-1">Medalla</th>
          <th className="border px-2 py-1">Pts. Extra</th>
        </tr>
      </thead>
      <tbody>
        {lista.map(p => (
          <FilaResultado
            key={p.id}
            p={p}
            resultado={resultados[p.id] ?? {}}
            onChange={(field, value) => onChangeResultado(p.id, field, value)}
          />
        ))}
      </tbody>
    </table>
  </div>
)

const ResultadosTorneo = () => {
  const { id } = useParams()
  const torneoId = Number(id)

  const [inscriptos, setInscriptos] = useState<Participacion[]>([])
  const [resultados, setResultados] = useState<Record<number, ResultadoForm>>({})
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
          medalla: p.medalla ? (p.medalla as Medalla) : undefined,
          puntosExtra: p.puntosExtra ?? undefined,
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
    value: ResultadoForm[keyof ResultadoForm]
  ) => {
    setResultados(prev => ({
      ...prev,
      [participacionId]: { ...prev[participacionId], [field]: value },
    }))
  }

  const handleGuardar = async () => {
    const payload = Object.entries(resultados).map(([id, data]) => ({
      id: Number(id),
      ...data,
    }))
    await guardarResultados(torneoId, payload)
    alert('Resultados guardados correctamente')
  }

  if (loading) return <p className="text-white p-8">Cargando...</p>

  const agrupados = inscriptos.reduce<Agrupados>((acc, p) => {
    const cat = p.categoriaEspecifica.nombre
    const sexo = p.categoriaEspecifica.requiereSexo ? p.sexo : 'UNISEX'
    acc[p.tipoArco] ??= {}
    acc[p.tipoArco][cat] ??= {}
    acc[p.tipoArco][cat][sexo] ??= []
    acc[p.tipoArco][cat][sexo].push(p)
    return acc
  }, {})

  return (
    <div className="mx-auto max-w-5xl px-6 py-10 space-y-10">
      <h2 className="text-2xl font-bold text-white">Carga de resultados</h2>

      {Object.entries(agrupados).map(([tipoArco, categorias]) => (
        <section key={tipoArco} className="space-y-6 rounded-xl border border-white/20 bg-white/5 p-6">
          <h3 className="text-xl font-bold text-white border-b border-white/20 pb-2">
            {tipoArco}
          </h3>

          {Object.entries(categorias).map(([cat, sexos]) => (
            <div key={cat} className="space-y-3">
              <h4 className="text-base font-semibold text-white/80">
                {cat.replaceAll('_', ' ')}
              </h4>

              {Object.entries(sexos).map(([sexo, lista]) => (
                <div key={sexo}>
                  {sexo !== 'UNISEX' && (
                    <p className="text-sm text-white/50 mb-1">{sexo}</p>
                  )}
                  <TablaGrupo
                    lista={lista}
                    resultados={resultados}
                    onChangeResultado={handleChange}
                  />
                </div>
              ))}
            </div>
          ))}
        </section>
      ))}

      <button
        type="button"
        onClick={handleGuardar}
        className="rounded-lg bg-sky-500 px-6 py-2.5 font-semibold text-white hover:bg-sky-400 transition-colors"
      >
        Guardar resultados
      </button>
    </div>
  )
}

export default ResultadosTorneo
