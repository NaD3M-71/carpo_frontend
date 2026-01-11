import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-red-600 font-semibold'
      : 'text-white font-semibold hover:text-red-600 transition'

  return (
    <header className="border-b bg-blue-700">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* IZQUIERDA: Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src="/CARPOvect.svg"
              alt="CARPO"
              className="h-10 w-auto"
            />
          </NavLink>

          {/* CENTRO: navegación */}
          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/torneos" className={linkClass}>
              Torneos
            </NavLink>
            <NavLink to="/arqueros" className={linkClass}>
              Arqueros
            </NavLink>
            <NavLink to="/galeria" className={linkClass}>
              Galería
            </NavLink>
          </div>

          {/* DERECHA: Auth */}
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <Link
                to="/login"
                className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
              >
                Ingresar
              </Link>
            ) : (
              <>
                <Link
                  to="/perfil"
                  className="rounded-md px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition text-center"
                >
                  ¡Hola {user.nombre}!
                  <br></br>Mi perfil
                </Link>

                <button
                  onClick={logout}
                  className="rounded-md bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700 transition"
                >
                  Cerrar sesión
                </button>
              </>
            )}
          </div>

        </div>
      </nav>
    </header>
  )
}

export default Navbar
