import { getDataCategory } from '@/lib/getData/get-data-category'
import Link from 'next/link'

interface ParamsProps {
  params: {
    slug: string
  }
}

export default async function Category({ params }: ParamsProps) {
  const { slug } = params
  const { props } = await getDataCategory(slug)

  return (
    <div>
      <div>
        <h1>{slug}</h1>

        <div className="flex flex-wrap gap-8 justify-center my-8">
          {props?.selectedProducts.products &&
            props.selectedProducts.products.map((product) => {
              return (
                <Link href={`/details/${product.slug}`} key={product.id}>
                  <p className="block bg-red-900">{product.name}</p>
                  <img className="w-20" src={product.imageUrls[0]} alt="" />
                  <p>Valor do produto {Number(product.basePrice)}</p>
                  <p>{Number(product.discountPercentage)} % de desconto</p>
                </Link>
              )
            })}
        </div>
      </div>
    </div>
  )
}
