import type { Participacion } from '../../types/Participaciones'
import ListaInscriptos from './ListaInscriptos'

interface Props {
  inscriptos: Participacion[]
}

type Agrupados = Record<
  string, // tipoArco
  Record<
    string, // division (SENIOR | ESCUELA)
    Record<
      string, // sexo (MASCULINO | FEMENINO | UNISEX)
      Participacion[]
    >
  >
>

const InscriptosPorCategoria = ({ inscriptos }: Props) => {
  if (inscriptos.length === 0) {
    return (
      <p className="text-white/70">
        Todavía no hay arqueros inscriptos.
      </p>
    )
  }

  const agrupados = inscriptos.reduce<Agrupados>((acc, inscripto) => {
    const tipoArco = inscripto.tipoArco
    const division = inscripto.categoriaEspecifica.categoriaGeneral

    const sexo =
      division === 'SENIOR'
        ? inscripto.arquero.sexo
        : 'UNISEX'

    acc[tipoArco] ??= {}
    acc[tipoArco][division] ??= {}
    acc[tipoArco][division][sexo] ??= []

    acc[tipoArco][division][sexo].push(inscripto)

    return acc
  }, {})

  return (
    <div className="space-y-12">
      <h3 className="text-white text-xl">TOTAL INSCRIPTOS : {inscriptos.length}</h3>
      {Object.entries(agrupados).map(([tipoArco, divisiones]) => (
        <section key={tipoArco} className="space-y-6 border-4 border-white p-4 rounded-lg">
          <h2 className="text-2xl font-bold text-white">
            {tipoArco}
          </h2>

          {Object.entries(divisiones).map(([division, sexos]) => (
            <div key={division} className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                {division}
              </h3>

              {Object.entries(sexos).map(([sexo, lista]) => (
                <ListaInscriptos
                  key={sexo}
                  titulo={sexo}
                  inscriptos={lista}
                />
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

export default InscriptosPorCategoria
