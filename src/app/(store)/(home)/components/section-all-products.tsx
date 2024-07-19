'use client'

import { CarouselProducts } from '@/components/carousel-products'
import { ProductProps } from '@/core/@types/api-store'
import { getDataProducts } from '@/actions/get/product/get-data-products'
import { NoProductRegistrationMessage } from '@/components/no-product-registration-message'
import { useQuery } from '@tanstack/react-query'
import { SkeletonCarousel } from './skeleton-carousel'
import { SectionProductName } from '@/constants/section-product-name'

export function SectionAllProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ['allProducts'],
    queryFn: () => getDataProducts({ page: 1 }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  if (isLoading) {
    return <SkeletonCarousel />
  }

  const hasProduct =
    !data || data?.notFound || data?.props?.products?.length === 0

  if (hasProduct) {
    return <NoProductRegistrationMessage />
  }

  const allProducts: ProductProps[] = JSON.parse(data.props.products).sort(
    () => Math.random() - 0.5,
  )

  return (
    <CarouselProducts
      section={SectionProductName.ALL_PRODUCTS}
      products={allProducts}
    />
  )
}
