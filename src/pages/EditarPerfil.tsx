import { useEffect, useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getMe, actualizarPerfil, type PerfilPayload } from '../api/arqueros'
import TrixEditor from '../components/TrixEditor'

const TIPOS_ARCO = ['RASO', 'TRADICIONAL', 'COMPUESTO', 'RECURVO', 'LONGBOW']
const LATERALIDAD = ['DIESTRO', 'ZURDO']
const SEXOS = ['MASCULINO', 'FEMENINO', 'OTRO']
const CATEGORIAS = ['ESCUELA', 'SENIOR']

const EditarPerfil = () => {
  const { user, updateUser } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState<PerfilPayload>({
    nombre: '',
    apellido: '',
    bio: '',
    tipoArco: '',
    lateralidad: '',
    categoriaGeneral: '',
    sexo: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: ''
  })

  const [loadingDatos, setLoadingDatos] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchPerfil = async () => {
      try {
        const data = await getMe()
        setForm({
          nombre: data.nombre ?? '',
          apellido: data.apellido ?? '',
          bio: data.bio ?? '',
          tipoArco: data.tipoArco ?? '',
          lateralidad: data.lateralidad ?? '',
          categoriaGeneral: data.categoriaGeneral ?? '',
          sexo: data.sexo ?? '',
          telefono: data.telefono ?? '',
          direccion: data.direccion ?? '',
          fechaNacimiento: data.fechaNacimiento
            ? data.fechaNacimiento.slice(0, 10)
            : ''
        })
      } catch (err) {
        console.error(err)
        setError('No se pudieron cargar tus datos')
      } finally {
        setLoadingDatos(false)
      }
    }

    fetchPerfil()
  }, [user])

  if (!user) {
    return (
      <p className="text-white text-center py-20">
        Tenés que iniciar sesión para editar tu perfil
      </p>
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleBioChange = (html: string) => {
    setForm((prev) => ({ ...prev, bio: html }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      setGuardando(true)
      const { arquero } = await actualizarPerfil(form)
      updateUser({
        nombre: arquero.nombre,
        apellido: arquero.apellido,
        bio: arquero.bio,
        tipoArco: arquero.tipoArco,
        lateralidad: arquero.lateralidad,
        categoriaGeneral: arquero.categoriaGeneral,
        sexo: arquero.sexo,
        telefono: arquero.telefono,
        direccion: arquero.direccion,
        fechaNacimiento: arquero.fechaNacimiento
      })
      navigate('/perfil')
    } catch (err) {
      console.error(err)
      setError('No se pudo actualizar el perfil')
    } finally {
      setGuardando(false)
    }
  }

  if (loadingDatos) {
    return (
      <p className="text-white text-center py-20">
        Cargando tus datos...
      </p>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        EDITAR PERFIL
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl bg-white p-6 shadow"
      >
        {error && (
          <p className="text-red-600 text-sm font-semibold">{error}</p>
        )}

        <label htmlFor="nombre" className="font-bold">Nombre</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          maxLength={100}
          className="w-full border px-3 py-2 rounded"
        />

        <label htmlFor="apellido" className="font-bold">Apellido</label>
        <input
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          required
          maxLength={100}
          className="w-full border px-3 py-2 rounded"
        />

        <label htmlFor="telefono" className="font-bold">Teléfono</label>
        <input
          name="telefono"
          type="tel"
          value={form.telefono}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <label htmlFor="direccion" className="font-bold">Dirección</label>
        <input
          name="direccion"
          value={form.direccion}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <label htmlFor="fechaNacimiento" className="font-bold">Fecha de nacimiento</label>
        <input
          name="fechaNacimiento"
          type="date"
          value={form.fechaNacimiento}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <label htmlFor="sexo" className="font-bold">Sexo</label>
        <select
          name="sexo"
          value={form.sexo}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="" disabled>Sexo</option>
          {SEXOS.map((s) => <option key={s}>{s}</option>)}
        </select>

        <label htmlFor="tipoArco" className="font-bold">Tipo de arco principal</label>
        <select
          name="tipoArco"
          value={form.tipoArco}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="" disabled>Tipo de arco</option>
          {TIPOS_ARCO.map((t) => <option key={t}>{t}</option>)}
        </select>

        <label htmlFor="lateralidad" className="font-bold">Lateralidad</label>
        <select
          name="lateralidad"
          value={form.lateralidad}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="" disabled>Lateralidad</option>
          {LATERALIDAD.map((l) => <option key={l}>{l}</option>)}
        </select>

        <label htmlFor="categoriaGeneral" className="font-bold">Categoría general</label>
        <select
          name="categoriaGeneral"
          value={form.categoriaGeneral}
          onChange={handleChange}
          required
          className="w-full border px-3 py-2 rounded"
        >
          <option value="" disabled>Categoría</option>
          {CATEGORIAS.map((c) => <option key={c}>{c}</option>)}
        </select>

        <label htmlFor="bio" className="font-bold">Biografía</label>
        <TrixEditor
          name="bio"
          value={form.bio}
          onChange={handleBioChange}
          placeholder="Contanos sobre vos..."
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate('/perfil')}
            className="w-full rounded-lg bg-gray-200 py-2 text-gray-800 font-semibold hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={guardando}
            className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700"
          >
            {guardando ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditarPerfil
