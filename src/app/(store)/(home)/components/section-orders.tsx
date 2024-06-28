'use client'

import { getDataBuyerOrderProducts } from '@/actions/get/buyer/get-data-buyer-order-products'
import { CarouselOrderProducts } from '@/components/carousel-products/order-products'
import { OrderProductProps } from '@/core/@types/api-store'
import { useQuery } from '@tanstack/react-query'
import { SkeletonCarousel } from './skeleton-carousel'

export function SectionOrders() {
  const { data, isLoading } = useQuery({
    queryKey: ['buyerOrderProducts'],
    queryFn: () => getDataBuyerOrderProducts(),
  })

  if (isLoading) {
    return <SkeletonCarousel />
  }

  const hasProduct =
    !data?.props || data?.notFound || data?.props?.orderProducts?.length === 0

  if (hasProduct) {
    return
  }

  const orderProducts: OrderProductProps[] = JSON.parse(
    data.props.orderProducts,
  )

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
