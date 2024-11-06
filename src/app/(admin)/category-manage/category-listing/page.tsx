import { Pagination } from '@/components/pagination'
import Link from 'next/link'
import { CategoryManageHeader } from '../components/category-manage-header'
import { getDataCatalog } from '@/actions/get/catalog/get-data-catalog'
import { CategoryProps } from '@/core/@types/api-store'
import { NoRegistrationMessage } from '@/components/no-registration-message'
import Image from 'next/image'
import { BaseUrl } from '@/constants/base-url'

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
                    <div className="flex flex-col items-center">
                      <div className="h-16 w-16 md:h-20 md:w-20">
                        <Image
                          height={400}
                          width={400}
                          src={`${BaseUrl.IMG}/${category.imgUrl}`}
                          alt="product image view"
                          className="h-full w-full border border-slate-300 object-fill"
                        />
                      </div>
                      <p className="font-bold">{category.title}</p>
                    </div>
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
