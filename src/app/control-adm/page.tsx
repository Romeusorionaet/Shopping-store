import { FormCategory } from './components/form-category'
import { getDataCatalog } from '@/lib/getData/get-data-catalog'
import { FormProduct } from './components/form-products'
import { AreaUpdateCategory } from './components/area-update-category'
import { getDataProducts } from '@/lib/getData/get-data-products'
import { AreaUpdateProduct } from './components/area-update-product'
import { prismaClient } from '@/lib/prisma'
import { AreaOrdersOfClients } from './components/area-orders-of-clients'

export default async function ControlAdm() {
  const categories = await getDataCatalog()
  const products = await getDataProducts()

  const ordersUsers = await prismaClient.user.findMany({
    include: {
      Order: {
        include: {
          orderProducts: {
            include: {
              product: true,
            },
          },
        },
      },
    },
  })
  // console.log(ordersUsers)

  const listOfCategories = categories.props?.categories
  const listOfProducts = products.props.products

  return (
    <main className="p-4 max-w-[800px] mx-auto">
      <h1 className="my-6 text-center text-xl font-bold">
        Controle de estoque
      </h1>

      <FormCategory />

      <FormProduct listOfCategory={categories.props?.categories} />

      {listOfCategories && (
        <AreaUpdateCategory
          listOfCategory={listOfCategories}
          listOfProducts={listOfProducts}
        />
      )}

      {listOfProducts && <AreaUpdateProduct listOfProducts={listOfProducts} />}

      <h2 className="my-6 text-center text-xl font-bold">Gerenciar pedidos</h2>

      <AreaOrdersOfClients ordersUsers={ordersUsers} />
    </main>
  )
}
