import { ModeOfSale, ProductProps } from '@/core/@types/api-store'
import { AddProductInCart } from '../add-product-in-cart'
import Link from 'next/link'
import Image from 'next/image'
import { CalculateValueProduct } from '@/utils/calculate-value-product'
import { SlugGenerator } from '@/utils/slug-generator'
import { DecorationPercentageIndicator } from '../decoration-percentage-indicator'
import { BaseUrl } from '@/constants/base-url'

interface Props {
  product: ProductProps
}

export function ProductCard({ product }: Props) {
  const { totalPrice } = CalculateValueProduct({
    discountPercentage: product.discountPercentage,
    basePrice: product.price,
  })

  const productAvailable = product.stockQuantity <= 0

  const slug = SlugGenerator.createFromText(product.title)

  return (
    <div className="group relative z-20 ml-3 h-72 md:h-[26rem]">
      <div
        data-quantity={productAvailable}
        className="absolute bottom-1 left-1/2 w-full -translate-x-1/2 transform group-focus-within:flex group-hover:flex data-[quantity=true]:hidden data-[quantity=true]:group-hover:hidden md:hidden"
      >
        <AddProductInCart product={product} />
      </div>

      <Link href={`/details/${slug.value}/${product.id}`}>
        <div
          data-quantity={productAvailable}
          className="flex flex-col items-center justify-center gap-1 rounded-md bg-base_reference_card p-1 duration-700 hover:bg-base_reference_card_hover data-[quantity=true]:bg-base_color_dark/5 data-[quantity=true]:hover:bg-base_color_dark/10 md:h-full md:gap-2 md:p-4"
        >
          <div className="line-clamp-2 h-8 text-center md:h-10">
            <p className="text-xs md:text-sm">{product.title}</p>
          </div>

          <div className="h-10">
            <div className="absolute bottom-36 left-0 rounded-md bg-base_color_dark/5 p-1 text-xs font-bold md:bottom-52">
              {product.placeOfSale === ModeOfSale.SELLS_ONLY_IN_THE_REGION ? (
                <span>Local</span>
              ) : (
                <span className=" text-base_color_positive">Brasil</span>
              )}
            </div>

            {product.discountPercentage !== 0 && (
              <div className="absolute bottom-20 left-0 md:left-4">
                <DecorationPercentageIndicator
                  discountPercentage={product.discountPercentage}
                />
              </div>
            )}

            {product.discountPercentage !== 0 && (
              <p className="text-xs line-through opacity-75">
                {Number(product.price).toLocaleString('pt-BR', {
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
              src={`${BaseUrl.IMG}/${product.imgUrlList[0]}`}
              alt={product.title}
            />
          </div>

          <div className="mb-4 flex w-full items-center justify-between gap-2 max-md:text-xs">
            {product.discountPercentage !== 0 && (
              <p className="text-base_color_positive">
                <strong>{product.discountPercentage}%</strong> Desc
              </p>
            )}

            <p className="font-black">Qtd: {product.stockQuantity}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}
