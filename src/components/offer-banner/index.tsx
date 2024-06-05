'use client'

import Image from 'next/image'
import motoG84 from '@/assets/img/banner-propaganda/moto-g84.png'
import iphone15ProMax from '@/assets/img/banner-propaganda/iphone-15-pro-max.png'
import lgK61 from '@/assets/img/banner-propaganda/LG-K61.png'
import asusRogPhone5S from '@/assets/img/banner-propaganda/asus-rog-phone-5s.png'
import huaweiHonorX7B from '@/assets/img/banner-propaganda/huawei-honor-x7b.png'
import positivoS650Twist5Max from '@/assets/img/banner-propaganda/positivo-s650-twist-5-max.png'
import samsungGalaxyS23Ultra from '@/assets/img/banner-propaganda/samsung-galaxy-S23-ultra.png'
import xiaomiNote13 from '@/assets/img/banner-propaganda/xiaomi-note-13.png'
import { useSlickCarousel } from '@/hooks/use-slick-carousel'
import '@/assets/styles/slide-slick/slick-theme.css'
import '@/assets/styles/slide-slick/slick.css'
import Slider from 'react-slick'
import { useRef } from 'react'
import { CustomSlider } from '@/components/carousel-products'

export function OfferBanner() {
  const { carouselAutoPlay } = useSlickCarousel()
  const slider = useRef<CustomSlider>(null)

  const listBanner = [
    { id: '1', img: motoG84 },
    { id: '2', img: iphone15ProMax },
    { id: '3', img: lgK61 },
    { id: '4', img: asusRogPhone5S },
    { id: '5', img: huaweiHonorX7B },
    { id: '6', img: positivoS650Twist5Max },
    { id: '7', img: samsungGalaxyS23Ultra },
    { id: '8', img: xiaomiNote13 },
  ]
  return (
    <div className="pt-20">
      <Slider ref={slider} {...carouselAutoPlay}>
        {listBanner.map((item) => {
          return (
            <div key={item.id} className="h-72 cursor-pointer md:h-[30rem]">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="h-full w-full rounded-b-md object-contain"
                src={item.img}
                alt=""
              />
            </div>
          )
        })}
      </Slider>
    </div>
  )
}
