import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getArqueroPublico, getArqueroCompleto } from '../api/arqueros'
import type { ArqueroPublico, ArqueroCompleto } from '../types/Arquero'

const ArqueroDetalle = () => {
  const { id } = useParams<{ id: string }>()
  const { user } = useAuth()
  const esAdmin = user?.rol === 'ADMIN' || user?.rol === 'SUPERADMIN'

  const [arquero, setArquero] = useState<ArqueroPublico | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [infoCompleta, setInfoCompleta] = useState<ArqueroCompleto | null>(null)
  const [cargandoCompleta, setCargandoCompleta] = useState(false)
  const [errorCompleta, setErrorCompleta] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return

    const fetchArquero = async () => {
      try {
        setLoading(true)
        const data = await getArqueroPublico(Number(id))
        setArquero(data)
        setError(null)
      } catch (err) {
        console.error(err)
        setError('No se pudo cargar el perfil de este arquero')
      } finally {
        setLoading(false)
      }
    }

    fetchArquero()
  }, [id])

  const handleVerInfoCompleta = async () => {
    if (!id) return

    try {
      setCargandoCompleta(true)
      setErrorCompleta(null)
      const data = await getArqueroCompleto(Number(id))
      setInfoCompleta(data)
    } catch (err) {
      console.error(err)
      setErrorCompleta('No se pudo cargar la información completa')
    } finally {
      setCargandoCompleta(false)
    }
  }

  if (loading) {
    return (
      <p className="text-white text-center py-20">
        Cargando perfil...
      </p>
    )
  }

  if (error || !arquero) {
    return (
      <p className="text-white text-center py-20">
        {error ?? 'Arquero no encontrado'}
      </p>
    )
  }

  const tieneBio = arquero.bio && arquero.bio.trim().length > 0

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-white space-y-8">
      <Link to="/arqueros" className="text-white/70 hover:text-white text-sm">
        ← Volver al listado
      </Link>

      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">
          {arquero.nombre} {arquero.apellido}
        </h1>

        {esAdmin && !infoCompleta && (
          <button
            type="button"
            onClick={handleVerInfoCompleta}
            disabled={cargandoCompleta}
            className="shrink-0 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-yellow-400 disabled:opacity-60"
          >
            {cargandoCompleta ? 'Cargando...' : 'Ver información completa'}
          </button>
        )}
      </div>

      {errorCompleta && <p className="text-red-400 text-sm">{errorCompleta}</p>}

      {infoCompleta && (
        <div className="rounded-xl bg-white p-6 text-gray-800 shadow space-y-2 border-2 border-yellow-500">
          <h2 className="text-lg font-bold mb-2">
            Información completa <span className="text-xs font-normal text-gray-500">(solo admin)</span>
          </h2>
          <p><strong>DNI:</strong> {infoCompleta.dni}</p>
          <p><strong>Email:</strong> {infoCompleta.email}</p>
          <p><strong>Teléfono:</strong> {infoCompleta.telefono || '—'}</p>
          <p><strong>Dirección:</strong> {infoCompleta.direccion || '—'}</p>
          <p><strong>Fecha de nacimiento:</strong> {infoCompleta.fechaNacimiento || '—'}</p>
          <p><strong>Rol:</strong> {infoCompleta.rol}</p>
          <p><strong>Estado:</strong> {infoCompleta.isActive ? 'Activo' : 'Inactivo'}</p>
          <p><strong>Última cuota:</strong> {infoCompleta.ultimaCuotaFecha || '—'} {infoCompleta.ultimaCuotaMonto ? `($${infoCompleta.ultimaCuotaMonto})` : ''}</p>
        </div>
      )}

      <div className="rounded-xl bg-white p-6 text-gray-800 shadow space-y-2">
        <h2 className="text-lg font-bold mb-2">Datos de arquero</h2>
        <p><strong>Tipo de arco:</strong> {arquero.tipoArco}</p>
        <p><strong>Lateralidad:</strong> {arquero.lateralidad}</p>
        <p><strong>Categoría:</strong> {arquero.categoriaGeneral}</p>
      </div>

      <div className="rounded-xl bg-white p-6 text-gray-800 shadow">
        <h2 className="text-lg font-bold mb-2">Biografía</h2>
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

export default ArqueroDetalle
