import { getDataUniqueProduct } from '@/lib/getData/get-data-unique-product'
import { FormUpdate } from '../components/form-update'

interface ParamsProps {
  params: {
    slug: string
  }
}

export default async function UpdateProduct({ params }: ParamsProps) {
  const { slug } = params
  const data = await getDataUniqueProduct(slug)
  const product = data.props?.product

  return (
    <div className="p-4 max-w-[800px] mx-auto">
      <h1 className="text-center mt-8">
        Altere os valores para atualizar o produto
      </h1>

      <div className="flex flex-col flex-wrap gap-8 items-center justify-center my-8">
        {product && <FormUpdate product={product} />}
      </div>
    </div>
  )
}
