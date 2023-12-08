'use client'

import { CalculateValueProduct } from '@/utils/calculate-value-product'
import { Product } from '@prisma/client'
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
      {products.length > 2 && (
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
              <div key={product.id} className="group relative h-[26rem] z-20">
                <div
                  data-quantity={productAvailable}
                  className="data-[quantity=true]:group-hover:hidden data-[quantity=true]:hidden group-hover:flex md:hidden absolute bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20"
                >
                  <AddProductInCart product={product} />
                </div>
                <Link href={`/details/${product.slug}`}>
                  <div
                    data-quantity={productAvailable}
                    className="p-4 bg-base_reference_card/60 hover:bg-base_reference_card_hover duration-700 flex flex-col justify-center items-center gap-2 rounded-md h-full data-[quantity=true]:bg-base_color_dark/5 data-[quantity=true]:hover:bg-base_color_dark/10 "
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
                          {Number(product.basePrice).toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                            minimumFractionDigits: 2,
                          })}
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

      {products.length > 2 && (
        <ArrowControlRight
          sizeList={sizeList}
          onClick={() => slider.current?.slickNext()}
        />
      )}
    </div>
  )
}
