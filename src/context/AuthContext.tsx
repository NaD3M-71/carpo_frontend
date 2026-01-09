import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: number
  nombre: string
  email: string
  rol: string
  tipoArco: string
  sexo: string
}

interface AuthContextType {
  user: User | null
  login: (token: string, usuario: User) => void
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // 👉 Al refrescar la página
  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        logout()
      }
    }

    setLoading(false)
  }, [])

  const login = (token: string, usuario: User) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(usuario))
    setUser(usuario)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
