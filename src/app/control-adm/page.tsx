import { FormCategory } from './components/form-category'
import { getDataCatalog } from '@/lib/getData/get-data-catalog'
import { FormProduct } from './components/form.products'
import { AreaUpdateCategory } from './components/area-update-category'
import { getDataProducts } from '@/lib/getData/get-data-products'
import { AreaUpdateProduct } from './components/area-update-product'

export default async function ControlAdm() {
  const categories = await getDataCatalog()
  const products = await getDataProducts()

  return (
    <div>
      <main className="p-4">
        <h1 className="my-6 text-center text-xl font-bold">
          Controle de estoque
        </h1>

        <div className="my-6 border-t border-zinc-500/60 pt-10">
          <h2 className="text-lg ">
            Cadastro de catalogo, <span className="opacity-80">categoria</span>.
          </h2>
          <p className="mt-4">Categorias existentes</p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center mb-10 border-b border-zinc-400 pb-8 p-2 h-40 overflow-y-auto bg-zinc-500/20 rounded-md">
          {categories.props?.categories.map((catalog) => {
            return (
              <div className="bg-zinc-200/10 p-2 rounded-md" key={catalog.id}>
                <p>{catalog.name}</p>
              </div>
            )
          })}
        </div>

        <FormCategory />

        <FormProduct listOfCategory={categories.props?.categories} />

        <AreaUpdateCategory listOfCategory={categories.props?.categories} />

        <AreaUpdateProduct listOfProducts={products.props.products} />
      </main>
    </div>
  )
}
