import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginRequest } from '../api/auth'
import { useAuth } from '../context/AuthContext'


const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const data = await loginRequest(email, password)
      login(data.token, data.usuario)
      navigate('/')
    } catch (err) {
      setError('Usuario o contraseña incorrectos')
      console.log(err);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl bg-white/10 p-6 text-white"
      >
        <h1 className="text-2xl font-bold">Ingresar</h1>

        <input
          className="w-full rounded-lg p-2 text-black bg-white"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full rounded-lg p-2 text-black bg-white"
          placeholder="Contraseña"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button type='submit' className="w-full rounded-lg bg-red-600 py-2 font-semibold hover:bg-red-700">
          Ingresar
        </button>

        <p className="text-xs opacity-80">
          ¿No tenés usuario? Contactá al CARPO para solicitar acceso.
        </p>
      </form>
    </div>
  )
}

export default Login
