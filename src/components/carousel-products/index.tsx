'use client'

import '@/assets/styles/slide-slick/slick.css'
import Slider from 'react-slick'
import { useEffect, useRef, useState } from 'react'
import { ArrowControlLeft, ArrowControlRight } from './arrows-carousel'
import { useSlickCarousel } from '@/hooks/use-slick-carousel'
import { ProductProps } from '@/core/@types/api-store'
import { ProductCard } from './product-card'
import Link from 'next/link'

export interface CustomSlider extends Slider {
  slickPrev: () => void
  slickNext: () => void
}

interface Props {
  products: ProductProps[]
  section?: string
}

export function CarouselProducts({ products, section }: Props) {
  const slider = useRef<CustomSlider>(null)
  const { carouselResponsive } = useSlickCarousel()

  const [sliderKey, setSliderKey] = useState(0)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [slidesToShow, setSlidesToShow] = useState(3)

  useEffect(() => {
    if (carouselResponsive && carouselResponsive.slidesToShow) {
      setSlidesToShow(carouselResponsive.slidesToShow)
    }
  }, [carouselResponsive])

  const handleAfterChange = (current: number) => {
    setCurrentSlide(current)
  }

  useEffect(() => {
    setSliderKey((prevKey) => prevKey + 1)
  }, [products])

  const sizeList = products.length === 0

  const searchUrl = section ? `/search?s=${section}&p=1` : '/search?p=1'

  return (
    <div className="relative">
      {products.length > slidesToShow && currentSlide > 0 && (
        <ArrowControlLeft
          sizeList={sizeList}
          onClick={() => slider.current?.slickPrev()}
        />
      )}

      <Slider
        key={sliderKey}
        ref={slider}
        {...carouselResponsive}
        afterChange={handleAfterChange}
      >
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />
          })}
        <div
          key="end-message"
          className="flex h-72 w-72 flex-nowrap items-center justify-center"
        >
          {products.length === 14 ? (
            <Link href={searchUrl}>
              <p className="underline">Ver todos...</p>
            </Link>
          ) : (
            <></>
          )}
        </div>
      </Slider>

      {products.length > slidesToShow &&
        currentSlide < products.length - slidesToShow && (
          <ArrowControlRight
            sizeList={sizeList}
            onClick={() => slider.current?.slickNext()}
          />
        )}
    </div>
  )
}
