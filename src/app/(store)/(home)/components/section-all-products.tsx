import { CarouselProducts } from '@/components/carousel-products'
import { SearchForm } from '@/components/search-form'
import { ProductProps } from '@/core/@types/api-store'
import { Suspense } from 'react'

interface Props {
  products: string
}

export function SectionAllProducts({ products }: Props) {
  const allProducts: ProductProps[] = JSON.parse(products).sort(
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
