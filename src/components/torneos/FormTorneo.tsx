import { useEffect, useState, type FormEvent } from 'react'
import { crearTorneo, actualizarTorneo, type TorneoPayload } from '../../api/torneos'
import type { Torneo } from '../../types/Torneo'

interface Props {
  torneo?: Torneo
  onClose: () => void
  onSuccess: () => void
}

const MODALIDADES = ['3D', 'SALA', 'CAMPO', 'MULTI_TARGET', 'AIRE_LIBRE']
const ESTADOS = ['ABIERTO', 'CERRADO']

const toInputDate = (isoString?: string | null) => {
  if (!isoString) return ''
  return isoString.slice(0, 10)
}

const FormTorneo = ({ torneo, onClose, onSuccess }: Props) => {
  const esEdicion = !!torneo

  const [nombre, setNombre] = useState(torneo?.nombre ?? '')
  const [modalidad, setModalidad] = useState(torneo?.modalidad ?? '')
  const [fechaInicio, setFechaInicio] = useState(toInputDate(torneo?.fechaInicio))
  const [fechaFin, setFechaFin] = useState(toInputDate(torneo?.fechaFin))
  const [fechaLimiteInscripcion, setFechaLimiteInscripcion] = useState(toInputDate(torneo?.fechaLimiteInscripcion))
  const [lugar, setLugar] = useState(torneo?.lugar ?? '')
  const [anio, setAnio] = useState(torneo?.anio ?? new Date().getFullYear())
  const [descripcion, setDescripcion] = useState(torneo?.descripcion ?? '')
  const [esCopaCARPO, setEsCopaCARPO] = useState(torneo?.esCopaCARPO ?? false)
  const [estado, setEstado] = useState(torneo?.estado ?? 'ABIERTO')

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')

    const payload: TorneoPayload = {
      nombre,
      modalidad,
      fechaInicio,
      lugar,
      anio,
      ...(fechaFin && { fechaFin }),
      ...(fechaLimiteInscripcion && { fechaLimiteInscripcion }),
      ...(descripcion && { descripcion }),
      esCopaCARPO,
      estado,
    }

    try {
      setLoading(true)
      if (esEdicion) {
        await actualizarTorneo(torneo.id, payload)
      } else {
        await crearTorneo(payload)
      }
      onSuccess()
      onClose()
    } catch (err) {
      console.error(err)
      setError('No se pudo guardar el torneo. Revisá los datos e intentá de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">
            {esEdicion ? 'Editar torneo' : 'Crear torneo'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          {error && (
            <p className="rounded-lg bg-red-50 border border-red-200 text-red-700 px-4 py-2 text-sm">
              {error}
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              maxLength={150}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Modalidad *</label>
              <select
                value={modalidad}
                onChange={e => setModalidad(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              >
                <option value="" disabled>Seleccionar</option>
                {MODALIDADES.map(m => (
                  <option key={m} value={m}>{m.replace('_', ' ')}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Año *</label>
              <input
                type="number"
                value={anio}
                onChange={e => setAnio(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                min={2000}
                max={2100}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lugar *</label>
            <input
              type="text"
              value={lugar}
              onChange={e => setLugar(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              required
              maxLength={100}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicio *</label>
              <input
                type="date"
                value={fechaInicio}
                onChange={e => setFechaInicio(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Fecha fin</label>
              <input
                type="date"
                value={fechaFin}
                onChange={e => setFechaFin(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha límite de inscripción</label>
            <input
              type="date"
              value={fechaLimiteInscripcion}
              onChange={e => setFechaLimiteInscripcion(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              value={descripcion}
              onChange={e => setDescripcion(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                value={estado}
                onChange={e => setEstado(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {ESTADOS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="esCopaCARPO"
                checked={esCopaCARPO}
                onChange={e => setEsCopaCARPO(e.target.checked)}
                className="h-4 w-4 accent-red-600"
              />
              <label htmlFor="esCopaCARPO" className="text-sm font-medium text-gray-700">
                Copa CARPO
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-300 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Guardando...' : esEdicion ? 'Guardar cambios' : 'Crear torneo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default FormTorneo
