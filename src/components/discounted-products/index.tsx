'use client'

import { useKeenSliderMode } from '@/hooks/useKeenSliderMode'
import { Product } from '@prisma/client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface productsProps {
  products: Product[] | undefined
}

export function DiscountedProducts({ products }: productsProps) {
  const { sliderRef, currentSlide, instanceRef } = useKeenSliderMode()

  return (
    <div
      ref={sliderRef}
      className="keen-slider relative w-full max-w-[1400px] mx-auto"
    >
      <div className="overflow-hidden flex">
        {products &&
          products.map((product) => {
            return (
              <div key={product.id} className="keen-slider__slide">
                <div className="p-4 bg-amber-50 hover:bg-amber-100 duration-700 flex flex-col justify-center items-center gap-4 rounded-md h-full lg:w-80 max-md:w-72 max-sm:w-52">
                  <p className="text-xs">{product.name}</p>

                  <Image
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-52 object-contain"
                    src={product.imageUrls[0]}
                    alt={product.name}
                  />

                  <div className="flex items-center justify-end gap-2 w-full">
                    <p className="opacity-60">Qtd:</p>
                    <span className="">{product.quantity}</span>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
      {instanceRef.current && (
        <div className="flex absolute max-md:hidden top-0 w-full h-full items-center justify-between">
          <div className="w-20 h-full bg-gradient-to-r from-amber-100 z-10 flex">
            <Arrow
              left
              onClick={(e) =>
                e.stopPropagation() || instanceRef.current?.prev()
              }
              disabled={currentSlide === 0}
            />
          </div>

          <div className="w-20 h-full bg-gradient-to-l from-amber-100 z-10 flex">
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
