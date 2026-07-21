import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getArquerosPaginado } from '../api/arqueros'
import type { ArqueroListItem } from '../types/Arquero'

const Arqueros = () => {
  const [arqueros, setArqueros] = useState<ArqueroListItem[]>([])
  const [busqueda, setBusqueda] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Reinicia a la página 1 cada vez que cambia el texto de búsqueda
  useEffect(() => {
    setPage(1)
  }, [busqueda])

  useEffect(() => {
    const fetchArqueros = async () => {
      try {
        setLoading(true)
        const data = await getArquerosPaginado(page, busqueda)
        setArqueros(data.arqueros)
        setTotalPages(data.totalPages)
        setError(null)
      } catch (err) {
        console.error(err)
        setError('No se pudo cargar el listado de arqueros')
      } finally {
        setLoading(false)
      }
    }

    const timeout = setTimeout(fetchArqueros, 300)
    return () => clearTimeout(timeout)
  }, [page, busqueda])

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-white space-y-6">
      <h1 className="text-3xl font-bold text-center">🏹 Arqueros</h1>

      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        placeholder="Buscar por nombre o apellido..."
        className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {error && <p className="text-red-400 text-center">{error}</p>}

      {loading ? (
        <p className="text-center text-white/70">Cargando...</p>
      ) : arqueros.length === 0 ? (
        <p className="text-center text-white/70">No se encontraron arqueros.</p>
      ) : (
        <div className="rounded-xl bg-white/10 divide-y divide-white/10">
          {arqueros.map((arquero) => (
            <Link
              key={arquero.id}
              to={`/arqueros/${arquero.id}`}
              className="block px-4 py-3 hover:bg-white/20 transition"
            >
              {arquero.apellido}, {arquero.nombre}
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="rounded-lg bg-white/10 px-4 py-2 font-semibold hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10"
          >
            Anterior
          </button>
          <span className="text-white/80">
            Página {page} de {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="rounded-lg bg-white/10 px-4 py-2 font-semibold hover:bg-white/20 disabled:opacity-40 disabled:hover:bg-white/10"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  )
}

export default Arqueros
