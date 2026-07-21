export interface Arqueros {
  id: number
  nombre: string
  apellido: string
  email: string
  tipoArco: string
  categoriaGeneral: string
  lateralidad: string
  bio: string | null
  sexo: string
  telefono?: string | null
  direccion?: string | null
  fechaNacimiento?: string | null
  arquero: Arqueros
}

// Item minimalista del listado público de arqueros: solo lo necesario
// para armar una lista clickeable, sin ningún dato personal.
export interface ArqueroListItem {
  id: number
  nombre: string
  apellido: string
}

export interface ListadoArquerosResponse {
  total: number
  page: number
  totalPages: number
  arqueros: ArqueroListItem[]
}

// Detalle público de un arquero: solo datos relevantes a la arquería y bio,
// nunca dni/email/telefono/direccion/fechaNacimiento.
export interface ArqueroPublico {
  id: number
  nombre: string
  apellido: string
  tipoArco: string
  lateralidad: string
  categoriaGeneral: string
  sexo: string
  edadCategoria: string | null
  bio: string | null
  fotoUrl: string | null
}

// Detalle completo, solo para ADMIN/SUPERADMIN (botón "Ver información completa")
export interface ArqueroCompleto extends ArqueroPublico {
  dni: number
  email: string
  telefono: string | null
  direccion: string | null
  fechaNacimiento: string | null
  isActive: boolean
  rol: string
  ultimaCuotaFecha: string | null
  ultimaCuotaMonto: number | null
}