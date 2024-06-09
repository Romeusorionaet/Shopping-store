import { CarouselOrderProducts } from '@/components/carousel-products/order-products'
import { OrderProductProps } from '@/core/@types/api-store'

interface Props {
  products: string
}

export function SectionOrders({ products }: Props) {
  const orderProducts: OrderProductProps[] = JSON.parse(products)

  const productMap: { [key: string]: OrderProductProps } = {}

  orderProducts.forEach((product) => {
    productMap[product.productId] = product
  })

  const shuffledProducts = Object.values(productMap).sort(
    () => Math.random() - 0.5,
  )

  return (
    <div>
      {shuffledProducts.length !== 0 && (
        <div className="bg-white p-2">
          <h2 className="my-4 text-lg uppercase md:text-lg">
            Produtos que você se interessou
          </h2>
          <CarouselOrderProducts orderProducts={shuffledProducts} />
        </div>
      )}
    </div>
  )
}
