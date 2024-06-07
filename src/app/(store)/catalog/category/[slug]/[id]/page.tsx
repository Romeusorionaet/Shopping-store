import { ProductProps } from '@/core/@types/api-store'
import { ProductCard } from '@/components/carousel-products/product-card'
import { Pagination } from '@/components/pagination'
import { getDataProductsTheSameCategory } from '@/actions/get/product/get-data-products-the-same-category'

interface ParamsProps {
  params: {
    id: string
    slug: string
  }
  searchParams: {
    p: number
  }
}

export default async function Category({ params, searchParams }: ParamsProps) {
  const { id, slug } = params
  const { p: page } = searchParams

  const { props } = await getDataProductsTheSameCategory({
    categoryId: id,
    page,
  })

  const products: ProductProps[] = JSON.parse(props.products)
  if (products.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center p-2">
        <h2>Não há produtos registrado para esta categoria.</h2>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col justify-between gap-4 pt-28">
      <div>
        <h1 className="mb-10 text-center text-2xl font-bold uppercase">
          {slug}
        </h1>

        <div className="my-8 flex flex-wrap justify-center gap-8">
          {products &&
            products.map((product) => {
              return <ProductCard key={product.id} product={product} />
            })}
        </div>
      </div>

      <div className="pb-28">
        <Pagination
          sizeList={products.length}
          disableArrowIf={products.length !== 0}
        />
      </div>
    </div>
  )
}
