'use client'

import Image from 'next/image'
import banner from '../../assets/banner/bannerExemplo.webp'
import { useKeenSliderMode } from '@/hooks/useKeenSliderMode'

export function OfferBanner() {
  const { autoSliderRef } = useKeenSliderMode()

  return (
    <div
      ref={autoSliderRef}
      className="keen-slider pt-[4.5rem] flex overflow-hidden"
    >
      <div className="keen-slider__slide">
        <div className="md:h-[30rem] h-80">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="object-fill w-full h-full rounded-b-md"
            src={banner}
            alt="Banner de promoção"
          />
        </div>
      </div>

      <div className="keen-slider__slide">
        <div className="md:h-[30rem] h-80">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="object-fill w-full h-full rounded-b-md"
            src={banner}
            alt="Banner de promoção"
          />
        </div>
      </div>

      <div className="keen-slider__slide">
        <div className="md:h-[30rem] h-80">
          <Image
            width={0}
            height={0}
            sizes="100vw"
            className="object-fill w-full h-full rounded-b-md"
            src={banner}
            alt="Banner de promoção"
          />
        </div>
      </div>
    </div>
  )
}
