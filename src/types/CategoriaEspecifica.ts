export interface CategoriaEspecifica {
  id: number
  nombre: string
  modalidad: string
  categoriaGeneral: string
}

export interface CategoriasResponse {
  categoriasEspecificas: CategoriaEspecifica[]
}