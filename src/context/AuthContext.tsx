import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

interface User {
  id: number
  nombre: string
  apellido?: string
  email: string
  rol: string
  tipoArco: string
  lateralidad?: string
  categoriaGeneral?: string
  sexo: string
  bio?: string | null
  telefono?: string | null
  direccion?: string | null
  fechaNacimiento?: string | null
}

interface AuthContextType {
  user: User | null
  login: ( usuario: User) => void
  logout: () => void
  updateUser: (datos: Partial<User>) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // 👉 Al refrescar la página
  useEffect(() => {

    const checkAuth = async ()=>{
      try {
        const { data } = await api.get('/arqueros/me')
        setUser(data)
      } catch(error){
        console.log(error);
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    
    checkAuth()
  }, [])

  const login = (usuario: User) => {
    setUser(usuario)
  }

  const logout = () => {
    try{
      api.post('/arqueros/logout')

    }catch(error){
      console.log(error);
    }
    setUser(null)
  }

  const updateUser = (datos: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...datos } : prev))
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
