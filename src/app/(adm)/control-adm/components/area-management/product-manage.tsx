import { CalculateValueProduct } from '@/utils/calculate-value-product'
// import { Product } from '@prisma/client'
import Image from 'next/image'

interface Props {
  // product: Product
  product: any
}

export function ProductManage({ product }: Props) {
  const { totalPrice } = CalculateValueProduct(product)

  return (
    <div className="bg-base_color_dark/50 p-1 text-center text-sm opacity-80">
      <div className="h-[220px]">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className="mx-auto h-full w-auto"
          src={product.imageUrls[0]}
          alt={product.name}
        />
      </div>
      <p>{product.name}</p>
      <p>
        Preço base{' '}
        {Number(product.basePrice).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
        })}
      </p>
      <p>Desconto {product.discountPercentage}%</p>
      <p>
        Valor pago:{' '}
        {totalPrice.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
          minimumFractionDigits: 2,
        })}
      </p>
    </div>
  )
}
