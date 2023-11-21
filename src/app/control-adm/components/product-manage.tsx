import { CalculateValueProduct } from '@/utils/calculate-value-product'
import { Product } from '@prisma/client'
import Image from 'next/image'

interface Props {
  product: Product
}

export function ProductManage({ product }: Props) {
  const { totalPrice } = CalculateValueProduct(product)

  return (
    <div className="text-sm text-zinc-300 text-center bg-slate-900 p-1">
      <div className="h-[220px]">
        <Image
          width={0}
          height={0}
          sizes="100vw"
          className="h-full w-auto mx-auto"
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
