'use client'

import Image from 'next/image'
import banner1 from '@/assets/img/banner/bannerExemplo.webp'
import banner2 from '@/assets/img/banner/bannerNotebook.jpeg'
import banner3 from '@/assets/img/banner/bannerCellPhone.jpg'
import banner4 from '@/assets/img/banner/bannerTablet.jpeg'
import banner5 from '@/assets/img/banner/bannerMouseGamer.png'
import { useSlickCarousel } from '@/hooks/use-slick-carousel'
import '@/styles/slide-slick/slick-theme.css'
import '@/styles/slide-slick/slick.css'
import Slider from 'react-slick'
import { useRef } from 'react'
import { CustomSlider } from '@/components/carousel-products'

export function OfferBanner() {
  const { carouselAutoPlay } = useSlickCarousel()
  const slider = useRef<CustomSlider>(null)

  const listBanner = [
    { id: '1', img: banner1, name: 'Banner de promoção' },
    { id: '2', img: banner2, name: 'Banner de promoção' },
    { id: '3', img: banner3, name: 'Banner de promoção' },
    { id: '3', img: banner4, name: 'Banner de promoção' },
    { id: '3', img: banner5, name: 'Banner de promoção' },
  ]
  return (
    <div className="pt-[4.5rem]">
      <Slider ref={slider} {...carouselAutoPlay}>
        {listBanner.map((item) => {
          return (
            <div key={item.id} className="h-72 cursor-pointer md:h-[30rem]">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full rounded-b-md"
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
