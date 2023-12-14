import { getDataUniqueProduct } from '@/lib/getData/get-data-unique-product'
import { FormUpdate } from '../components/form-update'
import { ProductIncludeCategoryAndProducts } from '@/app/details/[slug]/page'

interface ParamsProps {
  params: {
    slug: string
  }
}

export default async function UpdateProduct({ params }: ParamsProps) {
  const { slug } = params

  const { props } = await getDataUniqueProduct(slug)
  const product: ProductIncludeCategoryAndProducts = JSON.parse(props.product)

  return (
    <div className="mx-auto max-w-[800px] p-4">
      <h1 className="mt-8 text-center">
        Altere os valores para atualizar o produto
      </h1>

      <div className="my-8 flex flex-col flex-wrap items-center justify-center gap-8">
        {product && <FormUpdate product={product} />}
      </div>
    </div>
  )
}
