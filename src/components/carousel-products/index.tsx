'use client'

import { useKeenSliderMode } from '@/hooks/useKeenSliderMode'
import { CalculateValueProduct } from '@/utils/calculate-value-product'
import { Product } from '@prisma/client'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { AddProductInCart } from '../add-product-in-cart'

interface productsProps {
  products: Product[] | undefined
}

export function CarouselProducts({ products }: productsProps) {
  const { sliderRef, currentSlide, instanceRef } = useKeenSliderMode()

  if (!products) {
    return
  }

  const verifySizeProducts = products.length >= 4

  return (
    <div ref={sliderRef} className="keen-slider w-full px-4">
      <div className="relative">
        <div className="overflow-hidden flex">
          {products &&
            products.map((product) => {
              const { totalPrice } = CalculateValueProduct(product)
              const productAvailable = product.quantity <= 0

              return (
                <div key={product.id} className="keen-slider__slide z-20">
                  <div className="group relative h-[26rem]">
                    <div
                      data-quantity={productAvailable}
                      className="data-[quantity=true]:group-hover:hidden data-[quantity=true]:hidden group-hover:flex md:hidden absolute bottom-1 left-1 w-20"
                    >
                      <AddProductInCart product={product} />
                    </div>
                    <Link href={`/details/${product.slug}`}>
                      <div
                        data-quantity={productAvailable}
                        className="p-4 bg-base_reference_card/60 hover:bg-base_reference_card_hover duration-700 flex flex-col justify-center items-center gap-2 rounded-md h-full data-[quantity=true]:bg-base_color_dark/5 data-[quantity=true]:hover:bg-base_color_dark/10 lg:w-80 max-md:w-72 max-sm:w-52"
                      >
                        <div className="h-10">
                          <p className="text-sm">{product.name}</p>
                        </div>

                        <div className="h-10">
                          <div>
                            {product.placeOfSale === 'SELL_IN_REGION_ONLY' ? (
                              <span className="absolute bottom-28 left-0 bg-base_color_dark/5 p-1 rounded-md font-bold text-xs">
                                Local
                              </span>
                            ) : (
                              <span className="absolute bottom-28 left-0 bg-base_color_dark/5 p-1 rounded-md font-bold text-xs text-base_color_positive">
                                Brasil
                              </span>
                            )}
                          </div>

                          {product.discountPercentage !== 0 && (
                            <p className="text-xs line-through opacity-75">
                              {Number(product.basePrice).toLocaleString(
                                'pt-BR',
                                {
                                  style: 'currency',
                                  currency: 'BRL',
                                  minimumFractionDigits: 2,
                                },
                              )}
                            </p>
                          )}

                          <p>
                            {totalPrice.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                              minimumFractionDigits: 2,
                            })}
                          </p>
                        </div>

                        <Image
                          width={0}
                          height={0}
                          sizes="100vw"
                          className="w-full h-52 object-contain"
                          src={product.imageUrls[0]}
                          alt={product.name}
                        />

                        <div className="flex items-center justify-between gap-2 w-full mb-4">
                          {product.discountPercentage !== 0 && (
                            <p>
                              <strong>{product.discountPercentage}%</strong>{' '}
                              Desc
                            </p>
                          )}

                          <p>
                            Qtd: <strong>{product.quantity}</strong>
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
        </div>
        {instanceRef.current && verifySizeProducts && (
          <div className="flex absolute max-md:hidden top-0 w-full h-full items-center justify-between">
            <div className="w-20 h-full flex">
              <Arrow
                left
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.prev()
                }
                disabled={currentSlide === 0}
              />
            </div>

            <div className="w-20 h-full flex">
              <Arrow
                onClick={(e) =>
                  e.stopPropagation() || instanceRef.current?.next()
                }
                disabled={
                  currentSlide ===
                  instanceRef.current.track.details?.slides.length - 1
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
      className={`arrow text-base_detail_decoration opacity-60 hover:text-base_detail_decoration/60 duration-700 z-20 ${
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
