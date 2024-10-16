import { getDataUniqueCategory } from '@/actions/get/catalog/get-data-unique-category'
import { CategoryManageHeader } from '../../components/category-manage-header'
import { CategoryForm } from '../../components/form/category-form'
import { CategoryProps } from '@/core/@types/api-store'
import { ButtonDeleteCategory } from '../../components/button-delete-category'

interface Props {
  params: { id: string }
}

export default async function UpdateCategory({ params }: Props) {
  const { id } = params

  const { props } = await getDataUniqueCategory(id)

  if (!props.category) {
    return
  }

  const category: CategoryProps = JSON.parse(props.category)

  return (
    <div className="ml-12 w-full pt-32">
      <CategoryManageHeader categoryId={id} />

      <main>
        <section className="my-10 px-1">
          <h2 className="text-lg font-medium">
            Atualizar cetegoria:{' '}
            <span className="font-thin">{category.slug}</span>
          </h2>

          <section className="my-10 flex items-center justify-center">
            <CategoryForm category={category} />
          </section>

          <div className="mt-20 text-center">
            <ButtonDeleteCategory id={id} />
          </div>
        </section>
      </main>
    </div>
  )
}
