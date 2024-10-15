import { getDataCatalog } from '@/actions/get/catalog/get-data-catalog'
import CategoryItem from './components/category-item'
import { CategoryProps } from '@/core/@types/api-store'
import { NoRegistrationMessage } from '@/components/no-registration-message'

export default async function Catalog() {
  const { propsCategories } = await getDataCatalog()
  const categories: CategoryProps[] = JSON.parse(propsCategories.categories)

  const noCategories = !categories || categories.length === 0

  return (
    <div className="pb-28 pt-[8.5rem] text-center">
      <h1 className="text-2xl font-bold uppercase">Catálogo</h1>

      {noCategories && <NoRegistrationMessage type="CATEGORY" />}

      <div className="my-8 flex flex-wrap justify-center gap-8">
        {categories.map((category) => {
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
