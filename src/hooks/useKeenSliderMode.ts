'use client'

import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState } from 'react'

export function useKeenSliderMode() {
  const [widthScreen, setWidthScreen] = useState<number>()
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    setWidthScreen(window.innerWidth) // for an initial value

    window.onresize = () => {
      setWidthScreen(window.innerWidth)
    }
  }, [widthScreen])

  const animation = { duration: 30000, easing: (t: number) => t }

  const [autoSliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: 'performance',
    drag: true,
    slides: {
      perView: 1.5,
      spacing: 10,
    },
    created(s) {
      s.moveToIdx(5, true, animation)
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation)
    },
  })

  const [sliderRefModeDesktop, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    rtl: false,
    initial: 0,
    slides: {
      perView: 3.1,
      spacing: 10,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  const [sliderRefModeMobile] = useKeenSlider<HTMLDivElement>({
    loop: true,
    rtl: false,
    initial: 0,
    slides: {
      perView: 1.5,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel)
    },
  })

  const sliderRef =
    widthScreen && widthScreen <= 768
      ? sliderRefModeMobile
      : sliderRefModeDesktop

  return { sliderRef, currentSlide, instanceRef, autoSliderRef }
}
