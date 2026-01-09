import { useEffect, useState, type FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

import {
  getArqueros,
  getTorneoById,
  getCategoriasPorModalidad,
  getInscriptos,
  inscribirseATorneo,
  desinscribirseDelTorneo
} from '../api/torneos'



import type { Torneo } from '../types/Torneo'
import type { CategoriaEspecifica } from '../types/CategoriaEspecifica'
import type { Participacion,Arquero } from '../types/Participaciones'


const TIPOS_ARCO = ['RASO', 'RECURVO', 'COMPUESTO', 'TRADICIONAL', 'LONGBOW']
const SEXOS = ['MASCULINO', 'FEMENINO']

const InscribirArqueros = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const [torneo, setTorneo] = useState<Torneo | null>(null)
  const [arqueros, setArqueros] = useState<Arquero[]>([])
  const [categorias, setCategorias] = useState<CategoriaEspecifica[]>([])
  const [inscriptos, setInscriptos] = useState<Participacion[]>([])

  const [arqueroId, setArqueroId] = useState<number | ''>('')
  const [categoriaEspecificaId, setCategoriaEspecificaId] = useState<number | ''>('')
  const [tipoArco, setTipoArco] = useState('')
  const [sexo, setSexo] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const torneoData = await getTorneoById(Number(id))
        const arquerosData = await getArqueros()
        const categoriasData = await getCategoriasPorModalidad(torneoData.modalidad)
        const inscriptosData = await getInscriptos(Number(id))

        setTorneo(torneoData)
        setArqueros(arquerosData)
        setCategorias(categoriasData)
        setInscriptos(inscriptosData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [id])

  if (!user) return <p className="text-white">Cargando...</p>

  if (user.rol !== 'ADMIN' && user.rol !== 'SUPERADMIN') {
    return <p className="text-white">Acceso restringido</p>
  }
  if (!torneo) return null

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!arqueroId || !categoriaEspecificaId) return

    try {
      setLoading(true)

      await inscribirseATorneo({
        torneoId: torneo.id,
        arqueroId,
        categoriaEspecificaId,
        tipoArco,
        sexo
      })

      const inscriptosActualizados = await getInscriptos(torneo.id)
      setInscriptos(inscriptosActualizados)

      setArqueroId('')
      setCategoriaEspecificaId('')
      setTipoArco('')
      setSexo('')
    } catch (error) {
      console.error(error)
      alert('No se pudo inscribir el arquero')
    } finally {
      setLoading(false)
    }
  }

  const handleDesinscribir = async (p: Participacion) => {
    const ok = confirm('¿Desinscribir este arquero?')
    if (!ok) return

    await desinscribirseDelTorneo(p.torneoId, p.arqueroId)
    const actualizados = await getInscriptos(torneo.id)
    setInscriptos(actualizados)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 space-y-10">
      <h1 className="text-2xl font-bold text-white">
        Inscripción de arqueros – {torneo.nombre}
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h3 className="text-lg font-semibold">Inscribir arquero</h3>

        <select
          value={arqueroId}
          onChange={e => setArqueroId(Number(e.target.value))}
          className="w-full rounded border px-3 py-2"
          required
        >
          <option value="">Seleccionar arquero</option>
          {arqueros.map(a => (
            <option key={a.id} value={a.id}>
              {a.apellido}, {a.nombre}
            </option>
          ))}
        </select>

        <select
          value={tipoArco}
          onChange={e => setTipoArco(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        >
          <option value="">Tipo de arco</option>
          {TIPOS_ARCO.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        <select
          value={sexo}
          onChange={e => setSexo(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        >
          <option value="">Sexo</option>
          {SEXOS.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <select
          value={categoriaEspecificaId}
          onChange={e => setCategoriaEspecificaId(Number(e.target.value))}
          className="w-full rounded border px-3 py-2"
          required
        >
          <option value="">Categoría</option>
          {categorias.map(c => (
            <option key={c.id} value={c.id}>
              {c.nombre.replaceAll('_', ' ')}
            </option>
          ))}
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700"
        >
          {loading ? 'Inscribiendo...' : 'Inscribir arquero'}
        </button>
      </form>

      {/* LISTADO */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-4">Inscriptos</h3>

        {inscriptos.map(p => (
          <div
            key={p.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              {p.arquero.apellido}, {p.arquero.nombre}
            </span>

            <button
              onClick={() => handleDesinscribir(p)}
              className="text-sm text-red-600 hover:underline"
            >
              Desinscribir
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => navigate(-1)}
        className="text-sm text-white/70 hover:underline"
      >
        ← Volver
      </button>
    </div>
  )
}

export default InscribirArqueros
