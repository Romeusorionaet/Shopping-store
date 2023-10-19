import { prismaClient } from '@/lib/prisma'
import CategoryItem from './components/category-item'

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
                  <CategoryItem category={category} />
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
