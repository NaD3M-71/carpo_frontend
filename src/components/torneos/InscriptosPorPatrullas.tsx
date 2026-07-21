import type { Participacion } from '../../types/Participaciones'
import { getEstacaColor, getEstacaInfo, ordenarEstacas, MODALIDADES_POR_ESTACA } from '../../utils/estacas'
import type { EstacaColor } from '../../utils/estacas'

interface Props {
  inscriptos: Participacion[]
  modalidad: string
}

const NombreRow = ({ p }: { p: Participacion }) => (
  <p className="text-white text-sm py-0.5">
    {p.arquero.apellido}, {p.arquero.nombre}
  </p>
)

const InscriptosPorPatrullas = ({ inscriptos, modalidad }: Props) => {
  if (inscriptos.length === 0) {
    return <p className="text-white/70">Todavía no hay arqueros inscriptos.</p>
  }

  if (MODALIDADES_POR_ESTACA.has(modalidad)) {
    type GrupoEstaca = Record<EstacaColor, Record<string, Record<string, Participacion[]>>>

    const agrupados = inscriptos.reduce<GrupoEstaca>((acc, p) => {
      const color = getEstacaColor(p.tipoArco, p.categoriaEspecifica.categoriaGeneral)
      const sexo = p.categoriaEspecifica.requiereSexo ? p.sexo : 'UNISEX'
      acc[color] ??= {}
      acc[color][p.tipoArco] ??= {}
      acc[color][p.tipoArco][sexo] ??= []
      acc[color][p.tipoArco][sexo].push(p)
      return acc
    }, {} as GrupoEstaca)

    const coloresPresentes = ordenarEstacas(Object.keys(agrupados) as EstacaColor[])

    return (
      <div className="space-y-6">
        <p className="text-white/70 text-sm">Total: {inscriptos.length} inscriptos</p>
        {coloresPresentes.map(color => {
          const info = getEstacaInfo(color)
          const divisiones = agrupados[color]
          return (
            <section key={color} className="border-4 border-white rounded-lg p-4 space-y-4">
              <h2 className="text-xl font-bold text-white">
                {info.emoji} {info.label.toUpperCase()}
              </h2>
              {Object.entries(divisiones).map(([tipoArco, sexos]) => (
                <div key={tipoArco} className="space-y-2">
                  <h3 className="text-base font-semibold text-white/80">{tipoArco}</h3>
                  {Object.entries(sexos).map(([sexo, lista]) => (
                    <div key={sexo} className="pl-4">
                      {sexo !== 'UNISEX' && (
                        <p className="text-white/60 text-xs mb-1">{sexo}</p>
                      )}
                      {lista.map(p => <NombreRow key={p.id} p={p} />)}
                    </div>
                  ))}
                </div>
              ))}
            </section>
          )
        })}
      </div>
    )
  }

  // Sala / Aire Libre / Multi-Target: agrupar por división → categoría → sexo
  type GrupoLinea = Record<string, Record<string, Record<string, Participacion[]>>>

  const agrupados = inscriptos.reduce<GrupoLinea>((acc, p) => {
    const cat = p.categoriaEspecifica.nombre
    const sexo = p.categoriaEspecifica.requiereSexo ? p.sexo : 'UNISEX'
    acc[p.tipoArco] ??= {}
    acc[p.tipoArco][cat] ??= {}
    acc[p.tipoArco][cat][sexo] ??= []
    acc[p.tipoArco][cat][sexo].push(p)
    return acc
  }, {})

  return (
    <div className="space-y-6">
      <p className="text-white/70 text-sm">Total: {inscriptos.length} inscriptos</p>
      {Object.entries(agrupados).map(([tipoArco, categorias]) => (
        <section key={tipoArco} className="border-4 border-white rounded-lg p-4 space-y-4">
          <h2 className="text-xl font-bold text-white">{tipoArco}</h2>
          {Object.entries(categorias).map(([cat, sexos]) => (
            <div key={cat} className="space-y-2">
              <h3 className="text-base font-semibold text-white/80">
                {cat.replaceAll('_', ' ')}
              </h3>
              {Object.entries(sexos).map(([sexo, lista]) => (
                <div key={sexo} className="pl-4">
                  {sexo !== 'UNISEX' && (
                    <p className="text-white/60 text-xs mb-1">{sexo}</p>
                  )}
                  {lista.map(p => <NombreRow key={p.id} p={p} />)}
                </div>
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

export default InscriptosPorPatrullas
