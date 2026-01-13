import { useEffect, useState, type FormEvent } from 'react'
import { inscribirseATorneo, getCategoriasPorModalidad } from '../../api/torneos'
import { getArqueros } from '../../api/torneos'
import { useAuth } from '../../context/AuthContext'
import type { CategoriaEspecifica } from '../../types/CategoriaEspecifica'
import type { Arquero } from '../../types/Participaciones'
import { useNavigate } from 'react-router-dom'

interface Props {
  torneoId: number
  modalidad: string
  onSuccess?: () => void
}

const SEXOS = ['MASCULINO', 'FEMENINO']

const FormInscripcionAdmin = ({
  torneoId,
  modalidad,
  onSuccess
}: Props) => {
  const { user } = useAuth()
  const navigate = useNavigate()

  const [arqueros, setArqueros] = useState<Arquero[]>([])
  const [categorias, setCategorias] = useState<CategoriaEspecifica[]>([])

  const [arqueroId, setArqueroId] = useState<number | ''>('')
  const [categoriaEspecificaId, setCategoriaEspecificaId] = useState<number | ''>('')

  const [tipoArco, setTipoArco] = useState('')
  const [sexo, setSexo] = useState('')

  const [loading, setLoading] = useState(false)

  const esAdmin =
    user?.rol === 'ADMIN' || user?.rol === 'SUPER_ADMIN'

  // 🔒 Seguridad frontend básica
  if (!user || !esAdmin) return null

  // 🔥 cargar arqueros
  useEffect(() => {
    getArqueros()
      .then(setArqueros)
      .catch(err => console.error('Error cargando arqueros', err))
  }, [])

  // 🔥 cargar categorías según modalidad
  useEffect(() => {
    if (!modalidad) return

    getCategoriasPorModalidad(modalidad)
      .then(setCategorias)
      .catch(err => console.error('Error cargando categorías', err))
  }, [modalidad])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!arqueroId || !categoriaEspecificaId) return

    try {
      setLoading(true)

      await inscribirseATorneo({
        torneoId,
        arqueroId,
        categoriaEspecificaId,
        tipoArco,
        sexo
      })

      alert('Arquero inscripto correctamente')

      onSuccess?.()
      navigate(`/torneos/${torneoId}`, { replace: true })
    } catch (error) {
      console.error(error)
      alert('No se pudo inscribir al arquero')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl bg-white p-6 shadow"
    >
      <h3 className="text-lg font-semibold">
        Inscripción de arquero (Admin)
      </h3>

      {/* Arquero */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Arquero
        </label>
        <select
          value={arqueroId}
          onChange={e => setArqueroId(Number(e.target.value))}
          className="w-full rounded border px-3 py-2"
          required
        >
          <option value="" disabled>Seleccionar arquero</option>
          {arqueros.map(a => (
            <option key={a.id} value={a.id}>
              {a.apellido}, {a.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Tipo de arco */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Tipo de arco
        </label>
        <select
          value={tipoArco}
          onChange={e => setTipoArco(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        >
          <option value="" disabled>Tipo de arco</option>
          <option value="RASO" >RASO</option>
          <option value="TRADICIONAL" >TRADICIONAL</option>
          <option value="COMPUESTO" >COMPUESTO</option>
          <option value="RECURVO" >RECURVO</option>
          <option value="LONGBOW" >LONGBOW</option>
        </select>
      </div>

      {/* Sexo */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Sexo
        </label>
        <select
          value={sexo}
          onChange={e => setSexo(e.target.value)}
          className="w-full rounded border px-3 py-2"
          required
        >
          <option value="" disabled>Seleccionar</option>
          {SEXOS.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Categoría
        </label>
        <select
          value={categoriaEspecificaId}
          onChange={e => setCategoriaEspecificaId(Number(e.target.value))}
          className="w-full rounded border px-3 py-2"
          required
        >
          <option value="" disabled>Seleccionar</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.nombre.replaceAll('_', ' ')}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-700 py-2 text-white font-semibold hover:bg-blue-800 disabled:opacity-50"
      >
        {loading ? 'Inscribiendo...' : 'Inscribir arquero'}
      </button>
    </form>
  )
}

export default FormInscripcionAdmin
