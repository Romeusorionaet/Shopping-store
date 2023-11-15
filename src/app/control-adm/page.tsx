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
    <main className="px-4 max-w-[800px] mx-auto">
      <h1 className="my-6 text-center text-xl font-bold">
        Controle de estoque
      </h1>

      <FormCategory />

      <FormProduct listOfCategory={categories.props?.categories} />

      {categories.props && (
        <AreaUpdateCategory listOfCategory={categories.props?.categories} />
      )}

      {products && (
        <AreaUpdateProduct listOfProducts={products.props.products} />
      )}
    </main>
  )
}
