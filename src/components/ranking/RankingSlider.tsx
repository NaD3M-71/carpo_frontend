import { useKeenSlider } from 'keen-slider/react'
import 'keen-slider/keen-slider.min.css'

import RankingArcoCard from './RankingArcoCard'
import type { TipoArco } from '../../types/TipoArco'

const TIPOS_ARCO: TipoArco[] = [
  'RASO',
  'RECURVO',
  'COMPUESTO',
  'TRADICIONAL',
  'LONGBOW'
]

const RankingSlider = () => {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 3,
      spacing: 16,
    },
    breakpoints: {
      '(max-width: 1024px)': {
        slides: { perView: 3 },
      },
      '(max-width: 640px)': {
        slides: { perView: 1 },
      },
    },
    created(slider) {
      let timeout: ReturnType<typeof setTimeout>
      let mouseOver = false

      const clearNextTimeout = () => {
        clearTimeout(timeout)
      }

      const nextTimeout = () => {
        clearTimeout(timeout)
        if (mouseOver) return
        timeout = setTimeout(() => {
          slider.next()
        }, 3000)
      }

      slider.on('created', nextTimeout)
      slider.on('dragStarted', clearNextTimeout)
      slider.on('animationEnded', nextTimeout)
      slider.on('updated', nextTimeout)
      slider.on('mouseover', () => {
        mouseOver = true
        clearNextTimeout()
      })
      slider.on('mouseout', () => {
        mouseOver = false
        nextTimeout()
      })
    },
  })

  return (
    <div ref={sliderRef} className="keen-slider">
      {TIPOS_ARCO.map(tipo => (
        <div key={tipo} className="keen-slider__slide">
          <RankingArcoCard tipoArco={tipo} />
        </div>
      ))}
    </div>
  )
}

export default RankingSlider
