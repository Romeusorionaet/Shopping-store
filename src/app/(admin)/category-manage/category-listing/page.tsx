import { Pagination } from '@/components/pagination'
import Link from 'next/link'
import { CategoryManageHeader } from '../components/category-manage-header'
import { CategoryCardPreviewAdmin } from '../../components/category-card-admin/category-card-preview-admin'
import { getDataCatalog } from '@/actions/get/catalog/get-data-catalog'
import { CategoryProps } from '@/core/@types/api-store'
import { NoRegistrationMessage } from '@/components/no-registration-message'

interface SearchProps {
  searchParams: {
    p: number
  }
}

export default async function CategoryListing({ searchParams }: SearchProps) {
  const { p: page } = searchParams

  const { propsCategories } = await getDataCatalog(page ?? 1)
  const categories: CategoryProps[] = JSON.parse(propsCategories.categories)

  const noCategories = !categories || categories.length === 0

  return (
    <div className="ml-12 w-full pt-32">
      <CategoryManageHeader />

      {noCategories ? (
        <NoRegistrationMessage type="CATEGORY" />
      ) : (
        <main>
          <section className="mt-20 px-1 md:justify-start xl:justify-center">
            <div className="mt-10 flex flex-wrap gap-4">
              {categories.map((category) => {
                return (
                  <div key={category.id} className="flex flex-col gap-6">
                    <Link
                      href={`/category-manage/update-category/${category.id}`}
                      className="text-center underline"
                    >
                      Atualizar
                    </Link>
                    <CategoryCardPreviewAdmin
                      imgURL={category.imgUrl}
                      title={category.title}
                    />
                    <Link
                      href={`/category-manage/category-view/${category.id}`}
                      className="text-sm underline"
                    >
                      Detalhes tecnicos
                    </Link>
                  </div>
                )
              })}
            </div>
          </section>
          <Pagination
            disableArrowIf={noCategories}
            sizeList={categories.length}
          />
        </main>
      )}
    </div>
  )
}
