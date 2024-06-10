'use client'

import { getDataSearchProducts } from '@/actions/get/product/get-data-search-products'
import { CarouselProducts } from '@/components/carousel-products'
import { SectionProductName } from '@/constants/section-product-name'
import { ProductProps } from '@/core/@types/api-store'
import { useQuery } from '@tanstack/react-query'
import { SkeletonCarousel } from './skeleton-carousel'

export function SectionPromotion() {
  const { data, isLoading } = useQuery({
    queryKey: ['productPromotionFiltered'],
    queryFn: () =>
      getDataSearchProducts({
        section: SectionProductName.DISCOUNT_PERCENTAGE,
      }),
  })

  if (isLoading) {
    return <SkeletonCarousel />
  }

  const hasProduct =
    !data || data?.notFound || data?.props?.products?.length === 0

  if (hasProduct) {
    return
  }

  const productPromotionFiltered: ProductProps[] = JSON.parse(
    data.props.products,
  )

  const productsInOffers = productPromotionFiltered
    .filter((product) => product.discountPercentage >= 1)
    .sort(() => Math.random() - 0.5)

  return (
    <div>
      {productsInOffers.length !== 0 && (
        <div className="bg-white p-2">
          <h2 className="my-4 text-lg uppercase md:text-lg">Em promoção</h2>

          <CarouselProducts
            section={SectionProductName.DISCOUNT_PERCENTAGE}
            products={productsInOffers}
          />
        </div>
      )}
    </div>
  )
}
