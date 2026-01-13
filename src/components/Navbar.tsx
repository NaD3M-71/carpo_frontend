import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [menuAbierto, setMenuAbierto] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? 'text-red-400 font-semibold'
      : 'text-white font-semibold hover:text-red-400 transition'

  return (
    <header className="border-b bg-blue-700">
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">

          {/* LOGO */}
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src="/CARPOvect.svg"
              alt="CARPO"
              className="h-10 w-auto"
            />
          </NavLink>

          {/* NAV DESKTOP */}
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

          {/* AUTH DESKTOP */}
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
                  <br />
                  Mi perfil
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

          {/* BOTÓN HAMBURGUESA (MOBILE) */}
          <button
            onClick={() => setMenuAbierto(prev => !prev)}
            className="md:hidden text-white focus:outline-none"
            title={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          >
            <svg
              className="h-7 w-7"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  menuAbierto
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>

        </div>
      </nav>

      {/* MENÚ MOBILE */}
      {menuAbierto && (
        <div className="md:hidden bg-blue-700 border-t border-blue-600 px-4 py-4 space-y-4">
          <NavLink
            to="/torneos"
            onClick={() => setMenuAbierto(false)}
            className={linkClass}
          >
            Torneos
          </NavLink>

          <NavLink
            to="/arqueros"
            onClick={() => setMenuAbierto(false)}
            className={linkClass}
          >
            Arqueros
          </NavLink>

          <NavLink
            to="/galeria"
            onClick={() => setMenuAbierto(false)}
            className={linkClass}
          >
            Galería
          </NavLink>

          <hr className="border-blue-500" />

          {!user ? (
            <Link
              to="/login"
              onClick={() => setMenuAbierto(false)}
              className="block rounded-md bg-red-600 px-4 py-2 text-center font-semibold text-white"
            >
              Ingresar
            </Link>
          ) : (
            <>
              <Link
                to="/perfil"
                onClick={() => setMenuAbierto(false)}
                className="block rounded-md px-4 py-2 text-center font-semibold text-white hover:bg-white/10"
              >
                Mi perfil
              </Link>

              <button
                onClick={() => {
                  logout()
                  setMenuAbierto(false)
                }}
                className="w-full rounded-md bg-red-600 px-4 py-2 font-semibold text-white"
              >
                Cerrar sesión
              </button>
            </>
          )}
        </div>
      )}
    </header>
  )
}

export default Navbar
