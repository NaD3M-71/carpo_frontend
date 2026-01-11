export interface Arqueros {
  id: number
  nombre: string
  apellido: string
  email: string
  tipoArco: string
  categoriaGeneral: string
  lateralidad: string
  bio: string
  sexo: string
  arquero: Arqueros
}