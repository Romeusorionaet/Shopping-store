import { FormCategory } from './components/form-category'
import { getDataCatalog } from '@/lib/getData/get-data-catalog'
import { FormProduct } from './components/form.products'

export default async function Register() {
  const { props } = await getDataCatalog()

  return (
    <div>
      <main className="space-y-8">
        <div className="my-8 text-center">
          <h1>Save product</h1>
        </div>

        <h2 className="text-center">Categorias existentes</h2>

        <div className="flex flex-wrap gap-4 justify-center border-b border-white pb-8">
          {props?.categories.map((catalog) => {
            return (
              <div className="bg-cyan-800 p-1 rounded-md" key={catalog.id}>
                <p>{catalog.name}</p>
              </div>
            )
          })}
        </div>

        <FormCategory />

        <h2>Registrar Produtos</h2>

        <FormProduct listOfCategory={props?.categories} />
      </main>
    </div>
  )
}
