'use client'

import { useKeenSliderMode } from '@/hooks/useKeenSliderMode'
import { CalculateValueProduct } from '@/utils/calculate-value-product'
import { Product } from '@prisma/client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'

interface productsProps {
  products: Product[] | undefined
}

export function CarouselProducts({ products }: productsProps) {
  const { sliderRef, currentSlide, instanceRef } = useKeenSliderMode()

  return (
    <div
      ref={sliderRef}
      className="keen-slider w-full max-w-[1400px] mx-auto px-4"
    >
      <div className="relative">
        <div className="overflow-hidden flex">
          {products &&
            products.map((product) => {
              const { totalPrice } = CalculateValueProduct(product)

              return (
                <div key={product.id} className="keen-slider__slide z-20">
                  <div className="p-4 bg-amber-50/60 hover:bg-amber-100 duration-700 flex flex-col justify-center items-center gap-2 rounded-md h-full lg:w-80 max-md:w-72 max-sm:w-52">
                    <p className="text-sm">{product.name}</p>

                    <div>
                      <span className="absolute bottom-28 left-0 bg-zinc-100/40 p-1 rounded-md font-bold">
                        {product.placeOfSale}
                      </span>

                      {product.discountPercentage !== 0 && (
                        <p className="text-xs line-through opacity-75">
                          R$ {Number(product.basePrice).toFixed(2)}
                        </p>
                      )}

                      <p>R$ {totalPrice}</p>
                    </div>

                    <Image
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-52 object-contain"
                      src={product.imageUrls[0]}
                      alt={product.name}
                    />

                    <div className="flex items-center justify-between gap-2 w-full">
                      {product.discountPercentage !== 0 && (
                        <p>
                          <strong>{product.discountPercentage}%</strong> Desc
                        </p>
                      )}

                      <p>
                        Qtd: <strong>{product.quantity}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
        {instanceRef.current && (
          <div className="flex absolute max-md:hidden top-0 w-full h-full items-center justify-between">
            <div className="w-20 h-full bg-gradient-to-r from-amber-200/60 flex">
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />
            </div>

            <div className="w-20 h-full bg-gradient-to-l from-amber-200/60 flex">
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
      className={`arrow text-amber-500 opacity-60 hover:text-amber-800 duration-700 z-20 ${
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
