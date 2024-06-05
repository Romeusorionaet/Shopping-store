'use client'

import Image from 'next/image'
import Link from 'next/link'
import '@/assets/styles/slide-slick/slick.css'
import Slider from 'react-slick'
import { useEffect, useRef, useState } from 'react'
import { ArrowControlLeft, ArrowControlRight } from './arrows-carousel'
import { useSlickCarousel } from '@/hooks/use-slick-carousel'
import { OrderProductProps } from '@/core/@types/api-store'
import { SlugGenerator } from '@/utils/slug-generator'
import { BaseUrl } from '@/constants/base-url'

export interface CustomSlider extends Slider {
  slickPrev: () => void
  slickNext: () => void
}

interface Props {
  orderProducts: OrderProductProps[]
}

export function CarouselOrderProducts({ orderProducts }: Props) {
  const slider = useRef<CustomSlider>(null)
  const { carouselResponsive } = useSlickCarousel()

  const [sliderKey, setSliderKey] = useState(0)

  useEffect(() => {
    setSliderKey((prevKey) => prevKey + 1)
  }, [orderProducts])

  if (!orderProducts) {
    return null
  }

  const sizeList = orderProducts.length === 0

  return (
    <div className="relative">
      {orderProducts.length > 3 && (
        <ArrowControlLeft
          sizeList={sizeList}
          onClick={() => slider.current?.slickPrev()}
        />
      )}

      <Slider key={sliderKey} ref={slider} {...carouselResponsive}>
        {orderProducts &&
          orderProducts.map((orderProduct) => {
            const slug = SlugGenerator.createFromText(orderProduct.title)

            return (
              <div
                key={orderProduct.id}
                className="h-46 group relative z-20 md:h-[18rem]"
              >
                <Link href={`/details/${slug.value}/${orderProduct.productId}`}>
                  <div className="flex flex-col items-center justify-center gap-1 rounded-md bg-base_reference_card p-1 duration-700 hover:bg-base_reference_card_hover md:h-full md:gap-2 md:p-4">
                    <div className="h-10 text-center">
                      <p className="text-xs md:text-sm">{orderProduct.title}</p>
                    </div>

                    <div>
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-32 w-full object-contain md:h-52"
                        src={`${BaseUrl.IMG}/${orderProduct.imgUrl}`}
                        alt={orderProduct.title}
                      />
                    </div>
                  </div>
                </Link>
              </div>
            )
          })}
      </Slider>

      {orderProducts.length > 3 && (
        <ArrowControlRight
          sizeList={sizeList}
          onClick={() => slider.current?.slickNext()}
        />
      )}
    </div>
  )
}
