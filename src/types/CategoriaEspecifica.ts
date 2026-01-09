export interface CategoriaEspecifica {
  id: number
  modalidad: string
  categoriaGeneral: string
}

export interface CategoriasResponse {
  categoriasEspecificas: CategoriaEspecifica[]
}