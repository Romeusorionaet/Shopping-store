import { getRetrieveCategorySummaries } from '@/actions/get/catalog/get-data-retrieve-catalog-summaries'
import { GraphicBarCategoryProducts } from '../components/graphics/graphic-bar-category-products'
import { CategoryManageHeader } from './components/category-manage-header'
import { RetrieveCategorySummaryProps } from '@/core/@types/api-store'

export default async function CategoryManage() {
  const { props } = await getRetrieveCategorySummaries()

  const retrieveCategorySummaries: RetrieveCategorySummaryProps[] = JSON.parse(
    props?.retrieveCategorySummaries || '[]',
  )

  return (
    <div className="ml-12 w-full overflow-x-hidden pt-32">
      <CategoryManageHeader />

      <main className="px-1 pb-20">
        <section className="mt-28 flex h-full w-full flex-col justify-center gap-6 rounded-lg px-1 max-md:flex-wrap">
          <h2 className="text-xl">Quantidade de produtos por estoque</h2>

          <div className="flex w-full items-end gap-4">
            <GraphicBarCategoryProducts
              data={retrieveCategorySummaries}
              title="Todas as categoria e sua quantidade de produtos registrados"
            />
          </div>
        </section>
      </main>
    </div>
  )
}
