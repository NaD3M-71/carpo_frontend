
const Footer = () => {

  const logos = (
    <>
      <a href="https://nawalglamping.com" target="_blank" rel="noopener noreferrer">
        <img
          src="/nawal.png"
          alt="Nawal"
          className="h-16 md:h-28 w-auto opacity-90 hover:opacity-100 transition"
        />
      </a>

      <a href="https://zonavital.ar" target="_blank" rel="noopener noreferrer">
        <img
          src="/zonaVital.png"
          alt="Zona Vital"
          className="h-16 md:h-28 w-auto opacity-90 hover:opacity-100 transition"
        />
      </a>

      <a href="https://www.instagram.com/ripadambrosio/" target="_blank" rel="noopener noreferrer">
        <img
          src="/ripaDambrosio.png"
          alt="Ripa & D'Ambrosio"
          className="h-16 md:h-28 w-auto opacity-90 hover:opacity-100 transition"
        />
      </a>
      <a href="https://www.instagram.com/gscag/" target="_blank" rel="noopener noreferrer">
        <img
          src="/LOGO.png"
          alt="GS.code"
          className="h-16 md:h-28 w-auto opacity-90 hover:opacity-100 transition"
        />
      </a>
    </>
  )


  return (
    <footer className="bg-blue-800 text-white pt-10">
      
      {/* SPONSORS */}
      <div className="max-w-7xl mx-auto px-4 py-10 text-center">
        <p className="mb-8 text-m uppercase tracking-wider text-blue-200 font-black">
          Auspician la Copa CARPO
        </p>

        <div className="overflow-hidden">
          <div className="flex w-max animate-scroll animate-scroll-hover-pause">

            {/* Carril 1 */}
            <div className="flex items-center gap-24 px-12">
              {logos}
            </div>

            {/* Carril 2 */}
            <div className="flex items-center gap-24 px-12">
              {logos}
            </div>

            {/* Carril 3 */}
            <div className="flex items-center gap-24 px-12">
              {logos}
            </div>

          </div>
        </div>
      </div>

      {/* DIVISOR */}
      <div className="border-t border-blue-700" />

      {/* CRÉDITOS */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-blue-200">
          
          <span>
            © {new Date().getFullYear()} Club de Arquería CARPO
          </span>

          <div className="flex items-center gap-2">
            <span>Desarrollado por</span>
              <span>
                <span className="font-bold">
                  GS
                </span>
                .code
              </span>
            <a href={"https://gscode.com.ar"} target="_blank" rel="noopener noreferrer">
              <img
                src="/LOGO.png"
                alt="GS.code"
                className="h-4 w-auto opacity-80"
              />
            </a>
          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer
