'use client'

import { useKeenSliderMode } from '@/hooks/useKeenSliderMode'
import { Product } from '@prisma/client'
import {
  ArrowBigLeft,
  ArrowBigRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import Image from 'next/image'

interface productsProps {
  products: Product[] | undefined
}

export function DiscountedProducts({ products }: productsProps) {
  const { sliderRef, currentSlide, instanceRef } = useKeenSliderMode()

  return (
    <div ref={sliderRef} className="keen-slider relative">
      <div className="overflow-hidden flex">
        {products &&
          products.map((product) => {
            return (
              <div key={product.id} className="keen-slider__slide">
                <div className="bg-amber-100 hover:bg-amber-200 duration-700 flex flex-col justify-center items-center rounded-md h-full">
                  <p className="text-xs">{product.name}</p>
                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-20"
                    src={product.imageUrls[0]}
                    alt={product.name}
                  />
                </div>
              </div>
            )
          })}
      </div>
      {instanceRef.current && (
        <div className="flex absolute max-md:hidden top-0 w-full h-full items-center justify-between">
          <div className="w-20 h-full bg-gradient-to-r from-amber-200 z-10 flex">
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />
          </div>

          <div className="w-20 h-full bg-gradient-to-l from-amber-200 z-10 flex">
            <Arrow
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.next()
              }
              disabled={
                currentSlide ===
                instanceRef.current.track.details.slides.length - 1
              }
            />
          </div>
        </div>
      )}
    </div>
  )
}

function Arrow(props: {
  disabled: boolean
  left?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick: (e: any) => void
}) {
  const disabled = props.disabled ? 'arrow--disabled' : ''

  return (
    <svg
      onClick={props.onClick}
      className={`arrow text-amber-500 hover:text-amber-800 duration-700 ${
        props.left ? 'arrow--left' : 'arrow--right'
      } ${disabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {props.left && <ChevronLeft />}
      {!props.left && <ChevronRight />}
    </svg>
  )
}
