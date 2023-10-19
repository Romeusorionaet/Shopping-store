import { prismaClient } from '@/lib/prisma'
import Link from 'next/link'

interface ParamsProps {
  params: {
    id: string
    slug: string
  }
}

export default async function Product({ params }: ParamsProps) {
  const { id, slug } = params
  const { props } = await getDataSelectedProducts(id)

  return (
    <div>
      <div>
        <h1>{slug}</h1>

        <div className="flex flex-wrap gap-8 justify-center my-8">
          {props?.selectedProducts &&
            props.selectedProducts.map((product) => {
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

export const getDataSelectedProducts = async (id: string) => {
  const selectedProducts = await prismaClient.product.findMany({
    where: {
      categoryId: id,
    },
  })

  if (!selectedProducts) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      selectedProducts,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
