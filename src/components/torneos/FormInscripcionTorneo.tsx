import { useEffect, useState, type FormEvent } from 'react'
import { inscribirseATorneo, getCategoriasPorModalidad } from '../../api/torneos'
import { useAuth } from '../../context/AuthContext'
import type { CategoriaEspecifica } from '../../types/CategoriaEspecifica'
import { useNavigate } from 'react-router-dom'

interface Props {
  torneoId: number
  modalidad: string
  onSuccess?: () => void
}


const SEXOS = ['MASCULINO', 'FEMENINO']

const FormInscripcionTorneo = ({
  torneoId,
  modalidad,
  onSuccess
}: Props) => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [categorias, setCategorias] = useState<CategoriaEspecifica[]>([])
  const [categoriaEspecificaId, setCategoriaEspecificaId] = useState<number | ''>('')
  
  const [tipoArco, setTipoArco] = useState(user?.tipoArco ?? '')
  const [sexo, setSexo] = useState(user?.sexo ?? '')
  
  const [loading, setLoading] = useState(false)
  
  // 🔥 cargar categorías según modalidad del torneo
  useEffect(() => {
    if (!modalidad) return
    
    getCategoriasPorModalidad(modalidad)
    .then(setCategorias)
    .catch(err => {
      console.error('Error al cargar categorías', err)
    })
  }, [modalidad])
  
  if (!user) return null
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!categoriaEspecificaId) return
    
    try {
      setLoading(true)
      
      await inscribirseATorneo(
        {
          torneoId,
          arqueroId: user.id,
          categoriaEspecificaId,
          tipoArco,
          sexo
        }
      )

      alert('Inscripción realizada con éxito')
      
      onSuccess?.()
      navigate(`/torneos/${torneoId}`, { replace: true })
    } catch (error) {
      console.error('Error al inscribirse', error)
      alert('No se pudo completar la inscripción')
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
        Inscripción al torneo
      </h3>

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

      {/* Categoría específica */}
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
        className="w-full rounded-lg bg-red-600 py-2 text-white font-semibold hover:bg-red-700 disabled:opacity-50"
      >
        {loading ? 'Inscribiendo...' : 'Confirmar inscripción'}
      </button>
    </form>
  )
}

export default FormInscripcionTorneo
