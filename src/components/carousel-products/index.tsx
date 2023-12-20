'use client'

import { CalculateValueProduct } from '@/utils/calculate-value-product'
import { ModeOfSale, Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { AddProductInCart } from '../add-product-in-cart'
import '../../styles/slide-slick/slick.css'
import Slider from 'react-slick'
import { useEffect, useRef, useState } from 'react'
import { ArrowControlLeft, ArrowControlRight } from './arrows-carousel'
import { useSlickCarousel } from '@/hooks/use-slick-carousel'

export interface CustomSlider extends Slider {
  slickPrev: () => void
  slickNext: () => void
}

interface productsProps {
  products: Product[] | undefined
}

export function CarouselProducts({ products }: productsProps) {
  const slider = useRef<CustomSlider>(null)
  const { carouselResponsive } = useSlickCarousel()

  const [sliderKey, setSliderKey] = useState(0)

  useEffect(() => {
    setSliderKey((prevKey) => prevKey + 1)
  }, [products])

  if (!products) {
    return null
  }

  const sizeList = products.length === 0

  return (
    <div className="relative">
      {products.length > 3 && (
        <ArrowControlLeft
          sizeList={sizeList}
          onClick={() => slider.current?.slickPrev()}
        />
      )}

      <Slider key={sliderKey} ref={slider} {...carouselResponsive}>
        {products &&
          products.map((product) => {
            const { totalPrice } = CalculateValueProduct(product)
            const productAvailable = product.quantity <= 0

            return (
              <div
                key={product.id}
                className="group relative z-20 h-72 md:h-[26rem]"
              >
                <div
                  data-quantity={productAvailable}
                  className="absolute bottom-1 left-1/2 w-full -translate-x-1/2 transform group-hover:flex data-[quantity=true]:hidden data-[quantity=true]:group-hover:hidden md:hidden"
                >
                  <AddProductInCart product={product} />
                </div>
                <Link href={`/details/${product.slug}`}>
                  <div
                    data-quantity={productAvailable}
                    className="flex flex-col items-center justify-center gap-1 rounded-md bg-base_reference_card p-1 duration-700 hover:bg-base_reference_card_hover data-[quantity=true]:bg-base_color_dark/5 data-[quantity=true]:hover:bg-base_color_dark/10 md:h-full md:gap-2 md:p-4"
                  >
                    <div className="h-10 text-center">
                      <p className="text-xs md:text-sm">{product.name}</p>
                    </div>

                    <div className="h-10">
                      <div>
                        {product.placeOfSale ===
                        ModeOfSale.SELL_IN_REGION_ONLY ? (
                          <span className="absolute bottom-28 left-0 rounded-md bg-base_color_dark/5 p-1 text-xs font-bold">
                            Local
                          </span>
                        ) : (
                          <span className="absolute bottom-28 left-0 rounded-md bg-base_color_dark/5 p-1 text-xs font-bold text-base_color_positive">
                            Brasil
                          </span>
                        )}
                      </div>

                      {product.discountPercentage !== 0 && (
                        <p className="text-xs line-through opacity-75">
                          {Number(product.basePrice).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 2,
                          })}
                        </p>
                      )}

                      <p className="text-sm">
                        {totalPrice.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                          minimumFractionDigits: 2,
                        })}
                      </p>
                    </div>

                    <div>
                      <Image
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-32 w-full object-contain md:h-52"
                        src={product.imageUrls[0]}
                        alt={product.name}
                      />
                    </div>

                    <div className="mb-4 flex w-full items-center justify-between gap-2 max-md:text-xs">
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
                </Link>
              </div>
            )
          })}
      </Slider>

      {products.length > 3 && (
        <ArrowControlRight
          sizeList={sizeList}
          onClick={() => slider.current?.slickNext()}
        />
      )}
    </div>
  )
}
