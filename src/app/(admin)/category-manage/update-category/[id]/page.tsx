import { CategoryManageHeader } from '../../components/category-manage-header'
import { CategoryForm } from '../../components/form/category-form'

interface Props {
  params: { id: string }
}

export default function UpdateCategory({ params }: Props) {
  const { id } = params

  const category = {
    id: 'id-test',
    title: 'Motorola',
    slug: 'motorola',
    imgUrl: 'b99a5fc3-e27e-4922-ae00-b065b87b610c-wdoqbj.png',
    createdAt: new Date(),
    updatedAt: new Date(),
  }

  return (
    <div className="ml-12 w-full pt-32">
      <CategoryManageHeader categoryId={id} />

      <main>
        <section className="my-10 px-1">
          <h2 className="text-lg font-medium">Registrar uma nova cetegoria</h2>

          <section className="my-10 flex items-center justify-center">
            <CategoryForm category={category} />
          </section>
        </section>
      </main>
    </div>
  )
}
