import { Product } from '@prisma/client'

interface productsProps {
  products: Product[] | undefined
}

export function DiscountedProducts({ products }: productsProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {products &&
        products.map((product) => {
          return (
            <div key={product.id}>
              <p>{product.name}</p>
              {/* <img src={category.imageUrl} alt="" /> */}
              <p>{product.id}</p>
              <img className="w-20" src={product.imageUrls[0]} alt="" />
            </div>
          )
        })}
    </div>
  )
}
