import { prismaClient } from '@/lib/prisma'

interface ParamsProps {
  params: {
    id: string
  }
}

export default async function Details({ params }: ParamsProps) {
  const { id } = params
  const { props } = await getDataUniqueProduct(id)
  return (
    <div>
      <div>
        <h1>Mouses</h1>

        <div className="flex flex-wrap gap-8 justify-center my-8">
          {props?.selectedProducts &&
            props.selectedProducts.map((product) => {
              return (
                <div key={product.id}>
                  <p className="block bg-red-600">{product.name}</p>
                  <img className="w-20" src={product.imageUrls[0]} alt="" />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export const getDataUniqueProduct = async (id: string) => {
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

  console.log(selectedProducts)

  return {
    props: {
      selectedProducts,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
