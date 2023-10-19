import { Product } from '@prisma/client'

interface ProductListProps {
  products: Product[] | undefined
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex w-full gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
      {products &&
        products.map((product) => (
          <div key={product.id} className="w-[170px] max-w-[170px]">
            <p>{product.name}</p>
            <img src={product.imageUrls[0]} alt="" />
          </div>
        ))}
    </div>
  )
}
