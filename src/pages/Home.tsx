
import RankingSlider from "../components/ranking/RankingSlider"
import TorneosPreview from "../components/TorneoPreview"


const Home = () => {
  return (
    <div className="mx-auto items-center">
      <div className="pt-2 grid md:grid-cols-[1fr_2fr] gap-10 max-w-7xl mx-auto items-center">
        <div>
          <img src="/dragonsinfondo.png" alt="" />
          <h1 className="text-5xl font-bold text-white">
            CONOCÉ AL CARPO
          </h1>

          <h4 className="mt-2 text-xl font-bold text-white">
            Círculo de Arquería de la Región Patagonia Oeste
          </h4>

          <p className="mt-4 text-white/90">
            El CARPO es un club social de arquería fundado en Noviembre de 2018 en Trevelin. Nació del encuentro entre arqueros apasionados por el deporte, la camaradería y la mejora constante. Hoy es un espacio abierto para aprender, entrenar y compartir la arquería en todas sus modalidades, fomentando valores como el respeto, la disciplina y el trabajo en equipo.
          </p>
        </div>

        <div className="h-[450px]">
          <img
            src="/GIULILU.jpg"
            alt="Arquería CARPO"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

      </div>
      <div className="p-16">
        <h2 className="text-5xl font-bold text-white">PROXIMOS TORNEOS</h2>
        <main className="px-6 py-12">
          <TorneosPreview />
        </main>
      </div>
      <div className="p-16">
        <h2 className="text-5xl font-bold text-white">RANKINGS</h2>
        <RankingSlider />
      </div>
      <div className="pt-2 grid md:grid-cols-[1fr_2fr] gap-10 max-w-7xl mx-auto items-center bg-blue-400 p-5 w-full rounded-2xl">
        <div className="block">
          <h1 className="text-5xl font-bold text-white">
            ¿QUERÉS SER PARTE?
          </h1>

          <p className="mt-4 text-white/90">
            Para asociarte necesitás el Certificado de Iniciación en Arquería de FATARCO. El club dicta cursos durante el año y cuenta con lista de espera. Completá el formulario y sumate a la lista para dar tus primeros pasos en la arquería.
          </p>
          <div>
            <a
              href="https://docs.google.com/forms/..."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-6 bg-white text-red-600 px-6 py-3 rounded-lg hover:bg-blue-700 hover:text-white transition-colors"
            >
              ¡Quiero ser parte!
            </a>

          </div>
        </div>

        <div className="h-[450px]">
          <img
            src="/FOTOCARPO.jpg"
            alt="Arquería CARPO"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

      </div>
    </div>
    )
}

export default Home
