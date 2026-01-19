import { useEffect, useState } from 'react'
import { getResultados } from '../api/resultados'

type TipoArco =
  | 'COMPUESTO'
  | 'RECURVO'
  | 'LONGBOW'
  | 'TRADICIONAL'
  | 'RASO'

interface ResultadoAPI {
  arqueroId: number
  arquero: string
  TipoArco: TipoArco
  categoria: string
  sexo: string
  puntosTotal: number
  torneosParticipados: number
}

const CATEGORIAS: { key: TipoArco; label: string }[] = [
  { key: 'COMPUESTO', label: 'Compuesto' },
  { key: 'RECURVO', label: 'Recurvo' },
  { key: 'LONGBOW', label: 'Longbow' },
  { key: 'TRADICIONAL', label: 'Tradicional' },
  { key: 'RASO', label: 'Raso' }
]

const TablaResultados = ({
  titulo,
  datos
}: {
  titulo: string
  datos: ResultadoAPI[]
}) => {
  if (datos.length === 0) return null

  return (
    <div className="mb-10">
      <h2 className="mb-3 text-xl font-bold text-white">
        {titulo}
      </h2>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Arquero</th>
              <th className="px-4 py-3 text-left">Arco</th>
              <th className="px-4 py-3 text-right">Puntos</th>
              <th className="px-4 py-3 text-right">Torneos</th>
            </tr>
          </thead>
          <tbody>
            {datos.map(r => (
              <tr key={r.arqueroId} className="border-t">
                <td className="px-4 py-3">{r.arquero}</td>
                <td className="px-4 py-3">{r.TipoArco}</td>
                <td className="px-4 py-3 text-right font-semibold">
                  {r.puntosTotal}
                </td>
                <td className="px-4 py-3 text-right">
                  {r.torneosParticipados}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const CopaCarpoResultados = () => {
  const [resultados, setResultados] = useState<ResultadoAPI[]>([])
  const [filtroActivo, setFiltroActivo] = useState<TipoArco | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const data = await getResultados(2026)
        setResultados(data.tablaGeneral)
        console.log(data.tablaGeneral);
      } catch (error) {
        console.error('Error cargando resultados', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResultados()
  }, [])

  const toggleFiltro = (tipo: TipoArco) => {
    setFiltroActivo(prev => (prev === tipo ? null : tipo))
  }

  const resultadosFiltrados = resultados
    .filter(r => (filtroActivo ? r.TipoArco === filtroActivo : true))
    .sort((a, b) => b.puntosTotal - a.puntosTotal)

const senior = resultadosFiltrados.filter(
  r => r.categoria === 'SENIOR'
)

const seniorMasculino = senior.filter(
  r => r.sexo === 'MASCULINO'
)

const seniorFemenino = senior.filter(
  r => r.sexo === 'FEMENINO'
)

const escuela = resultadosFiltrados.filter(
  r => r.categoria === 'ESCUELA'
)


  if (loading) {
    return <p className="text-white">Cargando resultados...</p>
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-white">
        Copa CARPO – Resultados
      </h1>

      {/* Botones */}
      <div className="flex flex-wrap gap-3 mb-10">
        {CATEGORIAS.map(cat => (
          <button
            key={cat.key}
            onClick={() => toggleFiltro(cat.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition
              ${
                filtroActivo === cat.key
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-gray-200'
              }
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* GENERAL */}
      {!filtroActivo && (
        <TablaResultados
          titulo="Tabla General – Copa CARPO"
          datos={resultadosFiltrados}
        />
      )}

      {/* POR CATEGORÍA */}
      {filtroActivo && (
        <>
          <TablaResultados
            titulo="Senior Masculino"
            datos={seniorMasculino}
          />

          <TablaResultados
            titulo="Senior Femenino"
            datos={seniorFemenino}
          />

          <TablaResultados
            titulo="Escuela (Unisex)"
            datos={escuela}
          />
        </>
      )}
    </div>
  )
}

export default CopaCarpoResultados
