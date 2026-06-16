import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {passwordRecoveryRequest} from '../../api/auth'


const OlvidePassword = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if(loading) return
    setLoading(true)
    setError('')
    setSuccess('')
    try {
      await passwordRecoveryRequest(email)
      // Mostrar mensaje de éxito (opcional)
      setSuccess(`Si el email "${email}" existe, recibiras las instrucciones por ese medio para recuperar tu contraseña`)
      // Redirigir al usuario a la página de index después de un breve retraso
      setTimeout(() => {
        navigate('/')
      }, 3000)
      
    } catch (err) {
      setError('No se pudo procesar la solicitud')
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl bg-white/10 p-6 text-white"
      >
        <h1 className="text-2xl font-bold">Recuperar contraseña</h1>
        {success && (
          <p className="text-sm text-green-400">{success}</p>
        )}
        <h2 className='text-xl font-bold'>Si tu mail está registrado dentro de nuestro sistema, se te enviará un correo con las instrucciones.</h2>

        <label className="text-xs opacity-80" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          type="email"
          className="w-full rounded-lg p-2 text-black bg-white"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button type='submit' className="w-full rounded-lg bg-red-600 mt-2 py-2 font-semibold hover:bg-red-700" disabled={loading}>
          Enviar solicitud de recuperación
        </button>

        <p className="text-xs opacity-80">
          ¿No tenés usuario? Contactá al CARPO para solicitar acceso.
        </p>
      </form>
    </div>
  )
}

export default OlvidePassword
