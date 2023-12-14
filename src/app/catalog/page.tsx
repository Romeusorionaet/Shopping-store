import { getDataCatalog } from '@/lib/getData/get-data-catalog'
import CategoryItem from './components/category-item'
import { Category } from '@prisma/client'
import { NoProductRegistrationMessage } from '@/components/no-product-registration-message'

export default async function Catalog() {
  const { propsCategories } = await getDataCatalog()
  const categories: Category[] = JSON.parse(propsCategories.categories)

  if (categories.length === 0) {
    return <NoProductRegistrationMessage />
  }

  return (
    <div className="pt-[8.5rem] text-center">
      <h1 className="font-bold text-2xl">Catálogo</h1>

      <div className="flex flex-wrap gap-8 justify-center my-8">
        {categories &&
          categories.map((category) => {
            return (
              <div key={category.id}>
                <CategoryItem category={category} />
              </div>
            )
          })}
      </div>
    </div>
  )
}
