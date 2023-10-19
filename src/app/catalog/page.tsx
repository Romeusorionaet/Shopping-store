import { prismaClient } from '@/lib/prisma'
import Link from 'next/link'

export default async function Catalog() {
  const { props } = await getDataCatalog()

  return (
    <div>
      <div>
        <h1>Catálogo</h1>

        <div className="flex flex-wrap gap-8 justify-center my-8">
          {props?.categories &&
            props.categories.map((category) => {
              return (
                <div key={category.id}>
                  <Link href={`/product/${category.slug}/${category.id}`}>
                    {category.name}
                  </Link>
                  <img src={category.imageUrl} alt="" />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}

export const getDataCatalog = async () => {
  const categories = await prismaClient.category.findMany({})

  if (!categories) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      categories,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
