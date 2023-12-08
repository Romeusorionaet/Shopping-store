'use client'

import Image from 'next/image'
import banner from '../../assets/banner/bannerExemplo.webp'
import { useSlickCarousel } from '@/hooks/use-slick-carousel'
import '../../styles/slide-slick/slick.css'
import '../../styles/slide-slick/slick-theme.css'
import Slider from 'react-slick'
import { useRef } from 'react'
import { CustomSlider } from '../carousel-products'

export function OfferBanner() {
  const { carouselAutoPlay } = useSlickCarousel()
  const slider = useRef<CustomSlider>(null)

  const listBanner = [
    { id: '1', img: banner, name: 'Banner de promoção' },
    { id: '2', img: banner, name: 'Banner de promoção' },
    { id: '3', img: banner, name: 'Banner de promoção' },
    { id: '4', img: banner, name: 'Banner de promoção' },
    { id: '5', img: banner, name: 'Banner de promoção' },
    { id: '6', img: banner, name: 'Banner de promoção' },
    { id: '7', img: banner, name: 'Banner de promoção' },
  ]
  return (
    <div className="pt-[4.5rem]">
      <Slider ref={slider} {...carouselAutoPlay}>
        {listBanner.map((item) => {
          return (
            <div key={item.id} className="md:h-[30rem] h-80 cursor-pointer">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="object-fill w-full h-full rounded-b-md"
                src={item.img}
                alt={item.name}
              />
            </div>
          )
        })}
      </Slider>
    </div>
  )
}
