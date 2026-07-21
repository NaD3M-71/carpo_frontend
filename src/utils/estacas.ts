export type EstacaColor = 'ROJA' | 'AZUL' | 'AMARILLA'

export interface EstacaInfo {
  color: EstacaColor
  label: string
  emoji: string
}

const ORDEN_ESTACAS: EstacaColor[] = ['ROJA', 'AZUL', 'AMARILLA']

const MAPA: Record<string, Record<string, EstacaColor>> = {
  RECURVO:     { SENIOR: 'ROJA' },
  COMPUESTO:   { SENIOR: 'ROJA', ESCUELA: 'AZUL' },
  RASO:        { SENIOR: 'AZUL', ESCUELA: 'AMARILLA' },
  TRADICIONAL: { SENIOR: 'AZUL', ESCUELA: 'AMARILLA' },
  LONGBOW:     { SENIOR: 'AZUL', ESCUELA: 'AMARILLA' },
}

const INFO: Record<EstacaColor, Omit<EstacaInfo, 'color'>> = {
  ROJA:     { label: 'Estaca Roja',     emoji: '🔴' },
  AZUL:     { label: 'Estaca Azul',     emoji: '🔵' },
  AMARILLA: { label: 'Estaca Amarilla', emoji: '🟡' },
}

export function getEstacaColor(tipoArco: string, categoriaGeneral: string): EstacaColor {
  return MAPA[tipoArco]?.[categoriaGeneral] ?? 'AMARILLA'
}

export function getEstacaInfo(color: EstacaColor): EstacaInfo {
  return { color, ...INFO[color] }
}

export function ordenarEstacas(colores: EstacaColor[]): EstacaColor[] {
  return [...new Set(colores)].sort(
    (a, b) => ORDEN_ESTACAS.indexOf(a) - ORDEN_ESTACAS.indexOf(b)
  )
}

export const MODALIDADES_POR_ESTACA = new Set(['3D', 'CAMPO'])
