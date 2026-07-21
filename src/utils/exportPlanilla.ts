import * as XLSX from 'xlsx'
import type { Participacion } from '../types/Participaciones'
import { getEstacaColor, getEstacaInfo, ordenarEstacas, MODALIDADES_POR_ESTACA } from './estacas'
import type { EstacaColor } from './estacas'

const TOTAL_PATRULLAS = 12
const ARQUEROS_POR_PATRULLA = 4
const PATRULLAS_POR_FILA = 4
const COL_STEP = 2

function buildFilasInscriptos(inscriptos: Participacion[], modalidad: string): string[][] {
  const rows: string[][] = []

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

    for (const color of ordenarEstacas(Object.keys(agrupados) as EstacaColor[])) {
      const info = getEstacaInfo(color)
      rows.push([`${info.emoji} ${info.label.toUpperCase()}`])

      for (const [tipoArco, sexos] of Object.entries(agrupados[color])) {
        rows.push([`  ${tipoArco}`])
        for (const [sexo, lista] of Object.entries(sexos)) {
          if (sexo !== 'UNISEX') rows.push([`    ${sexo}`])
          for (const p of lista) {
            rows.push([`    ${p.arquero.apellido}, ${p.arquero.nombre}`])
          }
        }
        rows.push([''])
      }
      rows.push([''])
    }
  } else {
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

    for (const [tipoArco, categorias] of Object.entries(agrupados)) {
      rows.push([tipoArco])
      for (const [cat, sexos] of Object.entries(categorias)) {
        rows.push([`  ${cat.replaceAll('_', ' ')}`])
        for (const [sexo, lista] of Object.entries(sexos)) {
          if (sexo !== 'UNISEX') rows.push([`    ${sexo}`])
          for (const p of lista) {
            rows.push([`    ${p.arquero.apellido}, ${p.arquero.nombre}`])
          }
        }
        rows.push([''])
      }
      rows.push([''])
    }
  }

  return rows
}

function buildPlanillaPatrullas(): string[][] {
  const filasPorGrupo = ARQUEROS_POR_PATRULLA + 2 // header + slots + fila vacía separadora
  const cantGrupos = Math.ceil(TOTAL_PATRULLAS / PATRULLAS_POR_FILA)
  const totalFilas = cantGrupos * filasPorGrupo
  const totalCols = PATRULLAS_POR_FILA * COL_STEP - 1

  const grid: string[][] = Array.from({ length: totalFilas }, () =>
    Array<string>(totalCols).fill('')
  )

  for (let i = 0; i < TOTAL_PATRULLAS; i++) {
    const grupo = Math.floor(i / PATRULLAS_POR_FILA)
    const posEnFila = i % PATRULLAS_POR_FILA
    const filaBase = grupo * filasPorGrupo
    const col = posEnFila * COL_STEP

    grid[filaBase][col] = `PATRULLA ${i + 1}`
    // los slots quedan vacíos (string vacío ya asignado)
  }

  return grid
}

export function exportarPlanilla(
  inscriptos: Participacion[],
  modalidad: string,
  nombreTorneo: string
) {
  const wb = XLSX.utils.book_new()

  // Hoja 1: Inscriptos agrupados por categoría
  const encabezadoInscriptos: string[][] = [
    [`Torneo: ${nombreTorneo}`],
    [`Modalidad: ${modalidad}`],
    [`Total inscriptos: ${inscriptos.length}`],
    [''],
  ]
  const ws1 = XLSX.utils.aoa_to_sheet([
    ...encabezadoInscriptos,
    ...buildFilasInscriptos(inscriptos, modalidad),
  ])
  ws1['!cols'] = [{ wch: 45 }]
  XLSX.utils.book_append_sheet(wb, ws1, 'Inscriptos')

  // Hoja 2: Planilla de patrullas en blanco
  const encabezadoPlanilla: string[][] = [
    [`${nombreTorneo} — Planilla de Patrullas`],
    [''],
  ]
  const ws2 = XLSX.utils.aoa_to_sheet([
    ...encabezadoPlanilla,
    ...buildPlanillaPatrullas(),
  ])
  ws2['!cols'] = Array.from({ length: PATRULLAS_POR_FILA * COL_STEP }, (_, i) =>
    i % COL_STEP === 0 ? { wch: 28 } : { wch: 3 }
  )
  XLSX.utils.book_append_sheet(wb, ws2, 'Planilla de Patrullas')

  const nombreArchivo = `planilla_${nombreTorneo.replace(/\s+/g, '_').toLowerCase()}.xlsx`
  XLSX.writeFile(wb, nombreArchivo)
}
