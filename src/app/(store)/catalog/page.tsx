import { getDataCatalog } from '@/lib/getData/get-data-catalog'
import CategoryItem from './components/category-item'
import { NoProductRegistrationMessage } from '@/components/no-product-registration-message'
import { CategoryProps } from '@/core/@types/api-store'

export default async function Catalog() {
  const { propsCategories } = await getDataCatalog()
  const categories: CategoryProps[] = JSON.parse(propsCategories.categories)

  if (categories.length === 0) {
    return <NoProductRegistrationMessage />
  }

  return (
    <div className="pt-[8.5rem] text-center">
      <h1 className="text-2xl font-bold uppercase">Catálogo</h1>

      <div className="my-8 flex flex-wrap justify-center gap-8">
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
