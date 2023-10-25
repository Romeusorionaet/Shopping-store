import { getDataCatalog } from '@/lib/getData/get-data-catalog'
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
