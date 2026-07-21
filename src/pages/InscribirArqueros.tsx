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

import InscriptosPorPatrullas from '../components/torneos/InscriptosPorPatrullas'
import { exportarPlanilla } from '../utils/exportPlanilla'
import { getNombreCompletoParticipante } from '../utils/participantes'

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

  const [modoInvitado, setModoInvitado] = useState(false)
  const [invitadoNombre, setInvitadoNombre] = useState('')
  const [invitadoApellido, setInvitadoApellido] = useState('')
  const [invitadoClub, setInvitadoClub] = useState('')

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
    if (!categoriaEspecificaId) return
    if (!modoInvitado && !arqueroId) return
    if (modoInvitado && (!invitadoNombre || !invitadoApellido)) return

    try {
      setLoading(true)

      const nombreConClub = invitadoClub.trim()
        ? `${invitadoNombre} (${invitadoClub.trim().toUpperCase()})`
        : invitadoNombre

      await inscribirseATorneo({
        torneoId: torneo.id,
        categoriaEspecificaId,
        tipoArco,
        sexo,
        ...(modoInvitado
          ? { esInvitado: true, invitadoNombre: nombreConClub, invitadoApellido }
          : { arqueroId: arqueroId as number })
      })

      const inscriptosActualizados = await getInscriptos(torneo.id)
      setInscriptos(inscriptosActualizados)

      setArqueroId('')
      setCategoriaEspecificaId('')
      setTipoArco('')
      setSexo('')
      setInvitadoNombre('')
      setInvitadoApellido('')
      setInvitadoClub('')
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

    await desinscribirseDelTorneo(p.id)
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

        <label className="flex items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            checked={modoInvitado}
            onChange={e => setModoInvitado(e.target.checked)}
          />
          Inscribir invitado (no socio)
        </label>

        {modoInvitado ? (
          <>
            <input
              type="text"
              placeholder="Nombre del invitado"
              value={invitadoNombre}
              onChange={e => setInvitadoNombre(e.target.value)}
              className="w-full rounded border px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Apellido del invitado"
              value={invitadoApellido}
              onChange={e => setInvitadoApellido(e.target.value)}
              className="w-full rounded border px-3 py-2"
              required
            />
            <input
              type="text"
              placeholder="Club (opcional)"
              value={invitadoClub}
              onChange={e => setInvitadoClub(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
          </>
        ) : (
          <select
            title="Arquero"
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
        )}

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

      {/* LISTADO DE GESTIÓN */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold mb-4">Inscriptos ({inscriptos.length})</h3>

        {inscriptos.map(p => (
          <div
            key={p.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              {getNombreCompletoParticipante(p)}
              {p.esInvitado && (
                <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-semibold text-amber-700">
                  Invitado
                </span>
              )}
            </span>

            <button
              type="button"
              onClick={() => handleDesinscribir(p)}
              className="text-sm text-red-600 hover:underline"
            >
              Desinscribir
            </button>
          </div>
        ))}
      </div>

      {/* VISTA DE PATRULLAS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Vista de patrullas</h2>
          <button
            type="button"
            onClick={() => exportarPlanilla(inscriptos, torneo.modalidad, torneo.nombre)}
            disabled={inscriptos.length === 0}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Exportar planilla
          </button>
        </div>

        <InscriptosPorPatrullas
          inscriptos={inscriptos}
          modalidad={torneo.modalidad}
        />
      </div>

      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-sm text-white/70 hover:underline"
      >
        ← Volver
      </button>
    </div>
  )
}

export default InscribirArqueros
