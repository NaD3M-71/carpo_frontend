import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/axios'

const ResetPassword = () => {
  const { token } = useParams()
  console.log(token);

  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError('')
    setSuccess('')

    // Validaciones frontend
    if (!newPassword || !confirmPassword) {
      setError('Todos los campos son obligatorios')
      return
    }

    if (newPassword.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    if (newPassword !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    try {
      setLoading(true)
      console.log(`Token: ${token} Contraseña: ${newPassword}`);

      const { data } = await api.post(
        `/arqueros/restablecer-password/${token}`,
        {
          newPassword
        }
      )

      setSuccess(data.message || 'Contraseña actualizada correctamente')

      // Redirigir al login después de 2 segundos
      setTimeout(() => {
        navigate('/login')
      }, 2000)

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm space-y-4 rounded-xl bg-white/10 p-6 text-white"
      >
        <h1 className="text-2xl font-bold">
          Restablecer contraseña
        </h1>

        <p className="text-sm opacity-80">
          Ingresá tu nueva contraseña para recuperar el acceso a tu cuenta.
        </p>

        {/* Nueva contraseña */}
        <div className="space-y-1">
          <label
            htmlFor="newPassword"
            className="text-sm"
          >
            Nueva contraseña
          </label>

          <input
            id="newPassword"
            type="password"
            className="w-full rounded-lg bg-white p-2 text-black"
            placeholder="********"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/* Confirmar contraseña */}
        <div className="space-y-1">
          <label
            htmlFor="confirmPassword"
            className="text-sm"
          >
            Confirmar contraseña
          </label>

          <input
            id="confirmPassword"
            type="password"
            className="w-full rounded-lg bg-white p-2 text-black"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Error */}
        {error && (
          <p className="text-sm text-red-400">
            {error}
          </p>
        )}

        {/* Success */}
        {success && (
          <p className="text-sm text-green-400">
            {success}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-600 py-2 font-semibold transition hover:bg-red-700 disabled:opacity-50"
        >
          {loading
            ? 'Actualizando contraseña...'
            : 'Restablecer contraseña'}
        </button>

        <p className="text-xs opacity-70">
          Serás redirigido al login después de completar el proceso.
        </p>
      </form>
    </div>
  )
}

export default ResetPassword