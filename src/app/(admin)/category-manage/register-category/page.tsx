import { CategoryManageHeader } from '../components/category-manage-header'
import { CategoryForm } from '../components/form/category-form'

export default function RegisterCategory() {
  return (
    <div className="ml-12 w-full pt-32">
      <CategoryManageHeader />

      <main>
        <section className="my-10 px-1">
          <h2 className="text-lg font-medium">Registrar um novo produto</h2>

          <section className="my-10 flex items-center justify-center">
            <CategoryForm />
          </section>
        </section>
      </main>
    </div>
  )
}
