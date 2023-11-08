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

  return (
    <div>
      <h1 className="text-center mt-8 font-thin">
        Altere os valores para atualizar o produto
      </h1>

      <div className="flex flex-col flex-wrap gap-8 items-center justify-center my-8">
        {data.props && <FormUpdate product={data.props.product} />}
      </div>
    </div>
  )
}
