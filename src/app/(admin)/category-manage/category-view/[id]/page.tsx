import { getDataCategoryTechnicalDetails } from '@/actions/get/catalog/get-data-category-technical-details'
import { GraphicTimelineUpdates } from '@/app/(admin)/components/graphics/graphic-timeline-updates'
import { CategoryDetailsNotFoundError } from '../../components/category-details-not-found-error'
import { CategoryManageHeader } from '../../components/category-manage-header'
import { CategoryTechnicalDetails } from '@/core/@types/api-store'
import Image from 'next/image'
import { BaseUrl } from '@/constants/base-url'

interface Props {
  params: { id: string }
}

export default async function CategoryView({ params }: Props) {
  const { id } = params

  const { props } = await getDataCategoryTechnicalDetails(id)

  if (!props?.category) {
    return <CategoryDetailsNotFoundError id={id} />
  }

  const category: CategoryTechnicalDetails = JSON.parse(props.category)

  const basicInfo = category.categoryBasicInformation
  const categoryTimelineData = category.categoryTechnicalDetails

  return (
    <div className="ml-12 w-full pt-32">
      <CategoryManageHeader categoryId={id} />

      <main className="mt-10 px-1">
        <section className="flex flex-col items-center gap-6">
          <div className="flex gap-2">
            <div className="h-44 w-44 md:h-56 md:w-56">
              <Image
                height={500}
                width={500}
                src={`${BaseUrl.IMG}/${basicInfo.imgUrl}`}
                alt="product image view"
                className="h-full w-full border border-slate-300 object-fill"
              />
            </div>

            <div>
              <p>Nome: {basicInfo.title}</p>
              <p>Produtos: {category.productQuantityPerCategory} unidades</p>
            </div>
          </div>

          <section className="mt-28 flex h-full w-full flex-col justify-center gap-6 rounded-lg px-1 max-md:flex-wrap">
            <h2 className="text-xl">Linha do tempo</h2>

            <div className="flex items-end gap-4">
              <GraphicTimelineUpdates data={categoryTimelineData} />
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}
