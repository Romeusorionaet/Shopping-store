'use client'

import { getDataSearchProducts } from '@/actions/get/product/get-data-search-products'
import { CarouselProducts } from '@/components/carousel-products'
import { NoProductRegistrationMessage } from '@/components/no-product-registration-message'
import { SectionProductName } from '@/constants/section-product-name'
import { ProductProps } from '@/core/@types/api-store'
import { useQuery } from '@tanstack/react-query'
import ClipLoader from 'react-spinners/ClipLoader'

export function SectionPopular() {
  const { data, isLoading } = useQuery({
    queryKey: ['productPromotionFiltered'],
    queryFn: () =>
      getDataSearchProducts({
        section: SectionProductName.STARS,
      }),
  })

  if (isLoading) {
    return <ClipLoader color="#000" size={35} />
  }

  const hasProduct =
    !data || data?.notFound || data?.props?.products?.length === 0

  if (hasProduct) {
    return <NoProductRegistrationMessage />
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
