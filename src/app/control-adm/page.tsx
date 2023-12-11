import { FormCategory } from './components/forms-register/form-category'
import { getDataCatalog } from '@/lib/getData/get-data-catalog'
import { FormProduct } from './components/forms-register/form-products'
import { AreaUpdateCategory } from './components/area-management/area-update-category'
import { getDataProducts } from '@/lib/getData/get-data-products'
import { Category, Product } from '@prisma/client'
import { ManageOrders } from './components/order-management/manager-orders'
import { AreaUpdateProduct } from './components/area-management/area-update-product'

export default async function ControlAdm() {
  const { propsCategories } = await getDataCatalog()
  const categories: Category[] = JSON.parse(propsCategories.categories)

  const { props } = await getDataProducts()
  const products: Product[] = JSON.parse(props.products)

  return (
    <main className="p-4 max-w-[800px] mx-auto">
      <h1 className="my-6 text-center text-xl font-bold text-base_detail_decoration">
        Controle de estoque
      </h1>

      <FormCategory />

      <FormProduct listOfCategory={categories} />

      {categories && (
        <AreaUpdateCategory
          listOfCategory={categories}
          listOfProducts={products}
        />
      )}

      {products && <AreaUpdateProduct listOfProducts={products} />}

      <h2 className="my-6 text-center text-xl font-bold text-base_color_positive">
        Gerenciar pedidos
      </h2>

      <ManageOrders />
    </main>
  )
}
