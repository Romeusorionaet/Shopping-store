import { DecorationPercentageIndicator } from '@/components/decoration-percentage-indicator'
import { ModeOfSale, ProductProps } from '@/core/@types/api-store'
import { CalculateValueProduct } from '@/utils/calculate-value-product'
import Image from 'next/image'

interface Props {
  product: ProductProps
}

export function ProductCardManage({ product }: Props) {
  const { totalPrice } = CalculateValueProduct({
    discountPercentage: product.discountPercentage,
    basePrice: product.price,
  })

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <div className="group h-72 w-72 md:h-[26rem]">
        <div className="flex flex-col items-center justify-center gap-1 rounded-md bg-base_reference_card p-1 duration-700 hover:bg-base_reference_card_hover data-[quantity=true]:bg-base_color_dark/5 data-[quantity=true]:hover:bg-base_color_dark/10 md:h-full md:gap-2 md:p-4">
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
              src={product.imgUrlList[0]}
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
      </div>

      <div className="max-h-[26rem] max-w-[500px] overflow-auto border border-black/30 p-1">
        <p className="max-md:text-sm">{product.description}</p>
      </div>
    </div>
  )
}
