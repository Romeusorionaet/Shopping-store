import { Pagination } from '@/components/pagination'
import { ProductManageHeader } from '../components/product-manage-header'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ProductProps } from '@/core/@types/api-store'
import { getDataProducts } from '@/actions/get/product/get-data-products'
import { NoRegistrationMessage } from '@/components/no-registration-message'
import Image from 'next/image'
import { BaseUrl } from '@/constants/base-url'

interface SearchProps {
  searchParams: {
    p: number
  }
}

export default async function ProductListing({ searchParams }: SearchProps) {
  const { p: page } = searchParams
  const categories = [{ title: 'Samsung' }, { title: 'Motorola' }]

  const { props } = await getDataProducts({ page: page ?? 1 })
  const products: ProductProps[] = JSON.parse(props.products)

  const noProduct = !products || products.length === 0

  return (
    <div className="ml-12 w-full pt-32">
      <ProductManageHeader />

      {noProduct ? (
        <NoRegistrationMessage type="PRODUCT" />
      ) : (
        <main>
          <section className="mt-20 px-1 md:justify-start xl:justify-center">
            <div className="mb-10 flex gap-6 max-md:flex-col">
              <select
                defaultValue="Samsung"
                className="w-32 rounded-lg bg-base_one_reference_header p-1 text-base_color_text_top"
              >
                <option value="">Selecione</option>
                {categories.map((category, index) => (
                  <option key={index}>{category.title}</option>
                ))}
              </select>

              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="nome"
                  className="bg-transparent md:w-[25rem]"
                />

                <Button>Buscar</Button>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              {products.map((product) => {
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
          <Pagination disableArrowIf={noProduct} sizeList={products.length} />
        </main>
      )}
    </div>
  )
}
