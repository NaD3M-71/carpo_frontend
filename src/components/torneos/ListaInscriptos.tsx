import type { Participacion } from '../../types/Participaciones'

interface Props {
  titulo: string
  inscriptos: Participacion[]
}

const ListaInscriptos = ({ titulo, inscriptos }: Props) => {
  return (
    <div className="overflow-x-auto">
      <h4 className="mb-2 text-sm font-semibold text-white">
        {titulo}
      </h4>

      <table className="w-full border border-gray-200 bg-white text-sm">
        <thead className="bg-sky-50">
          <tr>
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1 text-left">Arquero</th>
            <th className="border px-2 py-1">Arco</th>
            <th className="border px-2 py-1">Clasif.</th>
            <th className="border px-2 py-1">Mejor</th>
            <th className="border px-2 py-1">Medalla</th>
            <th className="border px-2 py-1">Base</th>
            <th className="border px-2 py-1">Extra</th>
            <th className="border px-2 py-1 font-semibold">Total</th>
          </tr>
        </thead>

        <tbody>
          {inscriptos.map((p, index) => (
            <tr
              key={p.id}
              className="even:bg-sky-50/50 hover:bg-sky-100 transition"
            >
              <td className="border px-2 py-1 text-center">
                {index + 1}
              </td>

              <td className="border px-2 py-1">
                {p.arquero.apellido}, {p.arquero.nombre}
              </td>

              <td className="border px-2 py-1 text-center">
                {p.tipoArco}
              </td>

              <td className="border px-2 py-1 text-center">
                {p.puntajeClasificacion ?? 0}
              </td>

              <td className="border px-2 py-1 text-center">
                {p.esMejorClasificacion ? '✔' : '-'}
              </td>

              <td className="border px-2 py-1 text-center">
                {p.medalla ?? '-'}
              </td>

              <td className="border px-2 py-1 text-center">
                {p.puntosBase}
              </td>

              <td className="border px-2 py-1 text-center">
                {p.puntosExtra}
              </td>

              <td className="border px-2 py-1 text-center font-semibold">
                {p.puntosTotal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ListaInscriptos
