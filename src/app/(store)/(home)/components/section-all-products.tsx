'use client'

import { CarouselProducts } from '@/components/carousel-products'
import { SearchForm } from '@/components/search-form'
import { ProductProps } from '@/core/@types/api-store'
import { Suspense } from 'react'
import { getDataProducts } from '@/actions/get/product/get-data-products'
import { NoProductRegistrationMessage } from '@/components/no-product-registration-message'
import { useQuery } from '@tanstack/react-query'
import ClipLoader from 'react-spinners/ClipLoader'

export function SectionAllProducts() {
  const { data, isLoading } = useQuery({
    queryKey: ['allProoducts'],
    queryFn: () => getDataProducts({ page: 1 }),
  })

  if (isLoading) {
    return <ClipLoader color="#000" size={35} /> // TODO criar skeleton
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
    <div className="bg-white px-2 py-8">
      <Suspense fallback={null}>
        <SearchForm />
      </Suspense>

      <h2 className="my-4 uppercase md:text-lg">Todos os produtos</h2>

      <CarouselProducts products={allProducts} />
    </div>
  )
}
