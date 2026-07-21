import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getMe } from '../api/arqueros'

interface PerfilPropio {
  nombre: string
  apellido: string
  email: string
  sexo: string
  telefono: string | null
  direccion: string | null
  tipoArco: string
  lateralidad: string
  categoriaGeneral: string
  bio: string | null
}

const PerfilArquero = () => {
  const { user } = useAuth()
  const [arquero, setArquero] = useState<PerfilPropio | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    const fetchPerfil = async () => {
      try {
        const data = await getMe()
        setArquero(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchPerfil()
  }, [user])

  if (!user) {
    return (
      <p className="text-white text-center py-20">
        Tenés que iniciar sesión para ver tu perfil
      </p>
    )
  }

  if (loading) {
    return (
      <p className="text-white text-center py-20">
        Cargando perfil...
      </p>
    )
  }

  if (!arquero) {
    return (
      <p className="text-white text-center py-20">
        No se pudo cargar el perfil
      </p>
    )
  }

  const tieneBio = arquero.bio && arquero.bio.trim().length > 0

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 text-white space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">
          Mi perfil
        </h1>
        <Link
          to="/editar-perfil"
          className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
        >
          Editar perfil
        </Link>
      </div>

      {/* GRID PERFIL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* DATOS PERSONALES */}
        <div className="rounded-xl bg-white p-6 text-gray-800 shadow space-y-2">
          <h2 className="text-lg font-bold mb-2">
            Datos personales
          </h2>

          <p><strong>Nombre:</strong> {arquero.nombre} {arquero.apellido}</p>
          <p><strong>Email:</strong> {arquero.email}</p>
          <p><strong>Sexo:</strong> {arquero.sexo}</p>
          {arquero.telefono && <p><strong>Teléfono:</strong> {arquero.telefono}</p>}
          {arquero.direccion && <p><strong>Dirección:</strong> {arquero.direccion}</p>}
        </div>

        {/* DATOS DE ARQUERO */}
        <div className="rounded-xl bg-white p-6 text-gray-800 shadow space-y-2">
          <h2 className="text-lg font-bold mb-2">
            Datos de arquero
          </h2>

          <p><strong>Tipo de arco:</strong> {arquero.tipoArco}</p>
          <p><strong>Lateralidad:</strong> {arquero.lateralidad}</p>
          <p><strong>Categoría:</strong> {arquero.categoriaGeneral}</p>
        </div>
      </div>

      {/* BIOGRAFÍA */}
      <div className="rounded-xl bg-white p-6 text-gray-800 shadow">
        <h2 className="text-lg font-bold mb-2">
          Biografía
        </h2>

        {tieneBio ? (
          <p>{arquero.bio}</p>
        ) : (
          <p className="italic text-gray-600">
            Este arquero está demasiado ocupado afinando la puntería como para
            escribir su biografía… pero sin dudas es una pieza clave del club 🎯
          </p>
        )}
      </div>

    </div>
  )
}

export default PerfilArquero
