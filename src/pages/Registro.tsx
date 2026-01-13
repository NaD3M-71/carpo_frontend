import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

const REGISTRO_HABILITADO =
  import.meta.env.VITE_REGISTRO_HABILITADO === 'true'

const LATERALIDAD = ['DIESTRO', 'ZURDO']
const SEXOS = ['MASCULINO', 'FEMENINO']
const CATEGORIAS = ['ESCUELA', 'SENIOR']

const Registro = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    dni: '',
    email: '',
    password: '',
    telefono: '',
    direccion: '',
    fechaNacimiento: '',
    tipoArco: '',
    lateralidad: '',
    categoriaGeneral: '',
    sexo: '',
    edadCategoria: 'SENIOR',
    bio: ''
  })

  const [loading, setLoading] = useState(false)

  if (!REGISTRO_HABILITADO) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center text-white">
        <h1 className="text-2xl font-bold mb-2">Registro cerrado</h1>
        <p className="text-white/70">
          El período de inscripción no se encuentra habilitado.
        </p>
      </div>
    )
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/arqueros/register`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...form,
            dni: Number(form.dni),
            telefono: Number(form.telefono),
            fotoUrl: 'foto-dni'
          })
        }
      )

      if (!res.ok) {
        throw new Error('Error en el registro')
      }

      alert('Registro exitoso')
      navigate('/login')
    } catch (error) {
      console.error(error)
      alert('No se pudo completar el registro')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        REGISTRO DE ARQUEROS
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <label htmlFor="nombre" className='font-bold'>Nombre</label>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required maxLength={100} className="w-full border px-3 py-2 rounded" />
        <label htmlFor="apellido" className='font-bold'>Apellido</label>
        <input name="apellido" placeholder="Apellido" onChange={handleChange} required maxLength={100} className="w-full border px-3 py-2 rounded" />
        <label htmlFor="dni" className='font-bold'>DNI</label>
        <input name="dni" placeholder="DNI" onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <label htmlFor="email" className='font-bold'>Email</label>
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required className="w-full border px-3 py-2 rounded" />
        <label htmlFor="password" className='font-bold'>Contraseña</label>
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required minLength={6} className="w-full border px-3 py-2 rounded" />
        <label htmlFor="telefono" className='font-bold' >Teléfono </label>
        <input name="telefono" placeholder="Teléfono" required onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <label htmlFor="direccion" className='font-bold' >Dirección</label>
        <input name="direccion" placeholder="Dirección" required onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <label htmlFor="fechaNacimiento" className='font-bold'>Fecha de Nacimiento</label>
        <input name="fechaNacimiento" type="date" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        <label htmlFor="tipoArco" className='font-bold'>Tipo de Arco Principal</label>
        <select name="tipoArco" onChange={handleChange} required className="w-full border px-3 py-2 rounded">
          <option value="" disabled>Tipo de arco</option>
          <option value="RASO" >RASO</option>
          <option value="TRADICIONAL" >TRADICIONAL</option>
          <option value="COMPUESTO" >COMPUESTO</option>
          <option value="RECURVO" >RECURVO</option>
          <option value="LONGBOW" >LONGBOW</option>
        </select>
        <label htmlFor="lateralidad" className='font-bold'>Lateralidad</label>
        <select name="lateralidad" onChange={handleChange} required className="w-full border px-3 py-2 rounded">
          <option value="" disabled>Lateralidad</option>
          {LATERALIDAD.map(l => <option key={l}>{l}</option>)}
        </select>
        <label htmlFor="sexo" className='font-bold'>Sexo</label>
        <select name="sexo" onChange={handleChange} required className="w-full border px-3 py-2 rounded">
          <option value="" disabled >Sexo</option>
          {SEXOS.map(s => <option key={s}>{s}</option>)}
        </select>
        <label htmlFor="categoriaGeneral" className='font-bold'>Categoría General (puede cambiar mas adelante)</label>
        <select name="categoriaGeneral" onChange={handleChange} required className="w-full border px-3 py-2 rounded">
          <option value="" disabled>Categoría</option>
          {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
        </select>
        <label htmlFor="bio" className='font-bold'>Sobre vos, este campo es opcional y puede cambiar cuando consigas mas logros o tengas algo nuevo para contar ;) </label>
        <textarea
          name="bio"
          placeholder="Bio"
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-2 text-white font-semibold hover:bg-blue-700"
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  )
}

export default Registro
