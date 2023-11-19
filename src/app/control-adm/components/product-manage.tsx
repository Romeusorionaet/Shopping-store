import { Product } from '@prisma/client'

interface Props {
  product: Product
}

export function ProductManage({ product }: Props) {
  console.log(product)
  return (
    <div className="text-sm text-zinc-300">
      <p>{product.name}</p>
      <p>Preço base {Number(product.basePrice)} R$</p>
      <p>Quantidade {product.quantity}</p>
      <p>Desconto {product.discountPercentage}%</p>
    </div>
  )
}
