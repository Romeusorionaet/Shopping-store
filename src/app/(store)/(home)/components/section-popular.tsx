'use client'

import { getDataSearchProducts } from '@/actions/get/product/get-data-search-products'
import { CarouselProducts } from '@/components/carousel-products'
import { SectionProductName } from '@/constants/section-product-name'
import { ProductProps } from '@/core/@types/api-store'
import { useQuery } from '@tanstack/react-query'
import { SkeletonCarousel } from './skeleton-carousel'

export function SectionPopular() {
  const { data, isLoading } = useQuery({
    queryKey: ['productPromotionFiltered'],
    queryFn: () =>
      getDataSearchProducts({
        section: SectionProductName.STARS,
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

  const productPopularFiltered: ProductProps[] = JSON.parse(data.props.products)

  const topSellingProducts = productPopularFiltered
    .filter((product) => product.stars > 0)
    .sort(() => Math.random() - 0.5)

  return (
    <div>
      {topSellingProducts.length !== 0 && (
        <div className="bg-white p-2">
          <h2 className="my-4 text-lg uppercase md:text-lg">Mais populares</h2>

          <CarouselProducts
            section={SectionProductName.STARS}
            products={topSellingProducts}
          />
        </div>
      )}
    </div>
  )
}
