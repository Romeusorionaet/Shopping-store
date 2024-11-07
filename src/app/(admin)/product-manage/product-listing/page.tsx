import { Pagination } from '@/components/pagination'
import { ProductManageHeader } from '../components/product-manage-header'
import Link from 'next/link'
import { ProductProps } from '@/core/@types/api-store'
import { getDataProducts } from '@/actions/get/product/get-data-products'
import { NoRegistrationMessage } from '@/components/no-registration-message'
import Image from 'next/image'
import { BaseUrl } from '@/constants/base-url'
import { FormSearchProducts } from '../components/product-form/form-search-products'
import { Suspense } from 'react'
import { getDataSearchProducts } from '@/actions/get/product/get-data-search-products'

interface SearchProps {
  searchParams: {
    p: number
    q: string
    categoryId: string
  }
}

export default async function ProductListing({ searchParams }: SearchProps) {
  const { p: page, q: query, categoryId } = searchParams

  const { props } = await getDataProducts({ page: page ?? 1 })
  const products: ProductProps[] = JSON.parse(props.products)

  const noProduct = !products || products.length === 0

  const { props: propsSearched } = await getDataSearchProducts({
    page,
    query,
    categoryId,
  })

  const productsSearched: ProductProps[] = JSON.parse(propsSearched.products)

  const productList = productsSearched || products

  return (
    <div className="ml-12 w-full pb-10 pt-32">
      <ProductManageHeader />

      {noProduct ? (
        <NoRegistrationMessage type="PRODUCT" />
      ) : (
        <main>
          <section className="mt-20 px-1 md:justify-start xl:justify-center">
            <Suspense fallback={null}>
              <FormSearchProducts />
            </Suspense>

            <div className="mt-10 flex flex-wrap gap-4">
              {productList.map((product) => {
                return (
                  <div key={product.id} className="flex flex-wrap gap-4">
                    <div className="flex flex-col gap-6">
                      <Link
                        href={`/product-manage/update-product/id-test`}
                        className="text-center underline"
                      >
                        Atualizar
                      </Link>
                      <div className="flex h-24 w-28 flex-col justify-center gap-1 rounded-lg md:h-28 md:w-44">
                        <div className="flex gap-1">
                          <div className="h-16 w-16 md:h-20 md:w-20">
                            <Image
                              height={400}
                              width={400}
                              src={`${BaseUrl.IMG}/${product.imgUrlList[0]}`}
                              alt="product image view"
                              className="h-full w-full border border-slate-300 object-fill"
                            />
                          </div>
                          <div className="space-y-2 font-thin max-md:text-xs">
                            <p>QTD: {product.stockQuantity}</p>
                            <p>R$ {product.price}</p>
                          </div>
                        </div>
                        <div className="flex h-full flex-col bg-slate-100 p-0.5">
                          <p className="line-clamp-2 font-light max-md:text-xs md:line-clamp-3">
                            {product.title}
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/product-manage/product-view/id-test"
                        className="underline"
                      >
                        Detalhes tecnicos
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
          <Pagination
            disableArrowIf={noProduct}
            sizeList={productList.length}
          />
        </main>
      )}
    </div>
  )
}
