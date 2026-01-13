import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

interface Galeria {
  id: number
  titulo: string
  descripcion?: string
  link: string
}

const GALERIAS_INICIALES: Galeria[] = [
  {
    id: 1,
    titulo: 'Cierre de año 2025',
    descripcion: 'Torneo 3D Cierre de año en Don Edmundo',
    link: 'https://drive.google.com/drive/folders/17X920S8FH4E39-qJxAcyxYOb4iuGjzW7'
  },
  {
    id: 2,
    titulo: 'JJCC - Septiembre 2025',
    descripcion: 'Juego de Campo organizado por el CARPO',
    link: 'https://drive.google.com/drive/folders/1az7GTrvjTTsWJEBIAaFAbRLrsVvZi5qS'
  }
]

const Galeria = () => {
  const { user } = useAuth()
  const esAdmin = user?.rol === 'ADMIN' || user?.rol === 'SUPERADMIN'

  const [galerias, setGalerias] = useState(GALERIAS_INICIALES)
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState<Galeria | null>(null)

  const [form, setForm] = useState({
    titulo: '',
    descripcion: '',
    link: ''
  })

  const abrirNueva = () => {
    setEditando(null)
    setForm({ titulo: '', descripcion: '', link: '' })
    setModalOpen(true)
  }

  const abrirEditar = (g: Galeria) => {
    setEditando(g)
    setForm({
      titulo: g.titulo,
      descripcion: g.descripcion ?? '',
      link: g.link
    })
    setModalOpen(true)
  }

  const guardar = () => {
    if (!form.titulo || !form.link) return

    if (editando) {
      setGalerias(prev =>
        prev.map(g =>
          g.id === editando.id ? { ...g, ...form } : g
        )
      )
    } else {
      setGalerias(prev => [
        ...prev,
        {
          id: Date.now(),
          ...form
        }
      ])
    }

    setModalOpen(false)
  }

  const eliminar = (id: number) => {
    const ok = confirm('¿Eliminar esta galería?')
    if (!ok) return

    setGalerias(prev => prev.filter(g => g.id !== id))
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">
          Galería de fotos
        </h1>

        {esAdmin && (
          <button
            onClick={abrirNueva}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white font-semibold hover:bg-blue-700"
          >
            + Nueva galería
          </button>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galerias.map(g => (
          <div
            key={g.id}
            className="rounded-xl bg-white p-6 shadow hover:shadow-lg transition relative"
          >
            {esAdmin && (
              <div className="absolute top-2 right-2 flex gap-2 text-sm">
                <button
                  onClick={() => abrirEditar(g)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminar(g.id)}
                  className="text-red-600 hover:underline"
                >
                  Borrar
                </button>
              </div>
            )}

            <h3 className="text-lg font-semibold mb-1">
              {g.titulo}
            </h3>

            {g.descripcion && (
              <p className="text-sm text-gray-600">
                {g.descripcion}
              </p>
            )}

            <a
              href={g.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm text-blue-600 font-medium"
            >
              Ver fotos →
            </a>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md space-y-4">
            <h3 className="text-lg font-bold">
              {editando ? 'Editar galería' : 'Nueva galería'}
            </h3>

            <input
              className="w-full rounded border px-3 py-2"
              placeholder="Título"
              value={form.titulo}
              onChange={e => setForm({ ...form, titulo: e.target.value })}
            />

            <input
              className="w-full rounded border px-3 py-2"
              placeholder="Descripción (opcional)"
              value={form.descripcion}
              onChange={e => setForm({ ...form, descripcion: e.target.value })}
            />

            <input
              className="w-full rounded border px-3 py-2"
              placeholder="Link de Google Drive"
              value={form.link}
              onChange={e => setForm({ ...form, link: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={guardar}
                className="px-4 py-2 rounded bg-blue-600 text-white font-semibold"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Galeria
