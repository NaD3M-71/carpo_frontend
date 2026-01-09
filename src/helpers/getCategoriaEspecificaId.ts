import type { CategoriaEspecifica } from '../types/CategoriaEspecifica'

export const getCategoriaEspecificaId = (
  categorias: CategoriaEspecifica[],
  modalidad: string,
  categoriaGeneral: string
): number | null => {
  const categoria = categorias.find(
    c =>
      c.modalidad === modalidad &&
      c.categoriaGeneral === categoriaGeneral
  )

  return categoria ? categoria.id : null
}
