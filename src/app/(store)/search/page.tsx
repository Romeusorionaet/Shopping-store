import { SearchForm } from '@/components/search-form'
import { ProductProps } from '@/core/@types/api-store'
import { Suspense } from 'react'
import { ProductCard } from '@/components/carousel-products/product-card'
import { Pagination } from '@/components/pagination'
import { getDataProducts } from '@/actions/get/product/get-data-products'
import { getDataSearchProducts } from '@/actions/get/product/get-data-search-products'

interface SearchProps {
  searchParams: {
    q: string
    p: number
    s: string
  }
}

export default async function Search({ searchParams }: SearchProps) {
  const { q: query, p: page, s: section } = searchParams

  const { props } = await getDataProducts({ page })
  const products: ProductProps[] = JSON.parse(props.products)

  if (!products) {
    return <p className="mt-60 opacity-80">Problema na busca do produto</p>
  }

  const { props: propsProductFiltered } = await getDataSearchProducts({
    page,
    query,
    section,
  })

  const productsFiltered: ProductProps[] = JSON.parse(
    propsProductFiltered.products,
  )

  const productListToShow =
    productsFiltered.length !== 0 ? productsFiltered : products

  const searchedItemHasNotBeenFound = productsFiltered.length === 0 && query

  return (
    <div className="flex h-full w-full flex-col justify-between gap-4 pt-28">
      <div>
        <div className="mt-14 flex flex-col items-center gap-4 px-4">
          <Suspense fallback={null}>
            <SearchForm />
          </Suspense>

          {query && (
            <p>
              Resultado para: <span className="font-semibold">{query}</span>
            </p>
          )}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {searchedItemHasNotBeenFound ? (
            <p>Nem um item foi encontrado.</p>
          ) : (
            productListToShow.map((product) => {
              return <ProductCard key={product.id} product={product} />
            })
          )}
        </div>
      </div>

      <div className="pb-28">
        <Pagination
          sizeList={productListToShow.length}
          disableArrowIf={!searchedItemHasNotBeenFound}
        />
      </div>
    </div>
  )
}
