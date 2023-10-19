import { prismaClient } from '@/lib/prisma'
import { ProductList } from '../components/product-list'

interface ParamsProps {
  params: {
    slug: string
  }
}

export default async function Details({ params }: ParamsProps) {
  const { slug } = params
  const { props } = await getDataUniqueProduct(slug)

  return (
    <div>
      <div>
        <h1>Details</h1>

        <div className="flex flex-wrap gap-8 justify-center my-8">
          {props?.product && (
            <div key={props.product.id}>
              <p className="block bg-red-600">{props.product.name}</p>
              <img className="w-20" src={props.product.imageUrls[0]} alt="" />
              <div className="flex">
                {props.product.imageUrls.map((imageUrl) => {
                  return (
                    <img
                      key={imageUrl}
                      className="w-10"
                      src={imageUrl}
                      alt=""
                    />
                  )
                })}
              </div>
            </div>
          )}
        </div>

        <div>
          <h2>
            Lista do footer com items da mesma categoria sem o item autal{' '}
          </h2>

          <ProductList products={props?.product.category.products} />
        </div>
      </div>
    </div>
  )
}

export const getDataUniqueProduct = async (slug: string) => {
  const product = await prismaClient.product.findFirst({
    where: {
      slug,
    },
    include: {
      category: {
        include: {
          products: {
            where: {
              slug: {
                not: slug,
              },
            },
          },
        },
      },
    },
  })

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
