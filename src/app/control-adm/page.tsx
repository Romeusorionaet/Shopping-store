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
    where: {
      Order: {
        some: {
          id: {
            not: undefined,
          },
        },
      },
    },
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
      Address: true,
    },
  })

  const completedPaymentUsers = ordersUsers.map((orderUser) => ({
    ...orderUser,
    Order: orderUser.Order.filter(
      (order) =>
        order.status === 'PAYMENT_CONFIRMED' && order.trackingCode === '',
    ).sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return dateA.getTime() - dateB.getTime()
    }),
  }))

  const historicOfCompletedPaymentUsers = ordersUsers.map((orderUser) => ({
    ...orderUser,
    Order: orderUser.Order.filter(
      (order) =>
        order.status === 'PAYMENT_CONFIRMED' && order.trackingCode !== '',
    ).sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return dateA.getTime() - dateB.getTime()
    }),
  }))

  const uncompletedPaymentUsers = ordersUsers.map((orderUser) => ({
    ...orderUser,
    Order: orderUser.Order.filter(
      (order) => order.status === 'WAITING_FOR_PAYMENT',
    ).sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return dateB.getTime() - dateA.getTime()
    }),
  }))

  const listOfCategories = categories.props?.categories
  const listOfProducts = products.props.products

  return (
    <main className="p-4 max-w-[800px] mx-auto">
      <h1 className="my-6 text-center text-xl font-bold text-amber-500">
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

      <h2 className="my-6 text-center text-xl font-bold text-green-500">
        Gerenciar pedidos
      </h2>

      <div className="space-y-10">
        <div>
          <h3>
            Pedidos <strong className="text-green-500">pago</strong>,{' '}
            <span className="text-sm text-zinc-300">preparar para entrega</span>
          </h3>
          <AreaOrdersOfClients ordersUsers={completedPaymentUsers} />
        </div>

        <div>
          <h3>
            Histórico de Pedidos{' '}
            <strong className="text-green-500">pago</strong>,{' '}
            <span className="text-sm text-zinc-300">a caminho</span>.
          </h3>
          <AreaOrdersOfClients ordersUsers={historicOfCompletedPaymentUsers} />
        </div>

        <div>
          <h3>
            Pedidos <strong className="text-red-500">pendente</strong>,{' '}
            <span className="text-sm text-zinc-300">desistente</span>.
          </h3>
          <AreaOrdersOfClients ordersUsers={uncompletedPaymentUsers} />
        </div>
      </div>
    </main>
  )
}
