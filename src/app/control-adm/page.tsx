import { FormCategory } from './components/form-category'
import { getDataCatalog } from '@/lib/getData/get-data-catalog'
import { FormProduct } from './components/form-products'
import { AreaUpdateCategory } from './components/area-update-category'
import { getDataProducts } from '@/lib/getData/get-data-products'
import { AreaUpdateProduct } from './components/area-update-product'
import {
  AreaOrdersOfClients,
  UserWithOrders,
} from './components/area-orders-of-clients'
import { Category, Product } from '@prisma/client'
import { getDataOrdersUsers } from '@/lib/getData/get-data-orders-users'

export default async function ControlAdm() {
  const { propsCategories } = await getDataCatalog()
  const categories: Category[] = JSON.parse(propsCategories.categories)

  const { props } = await getDataProducts()
  const products: Product[] = JSON.parse(props.products)

  const { propsOrdersUsers } = await getDataOrdersUsers()
  const ordersUsers: UserWithOrders[] = JSON.parse(propsOrdersUsers.ordersUsers)

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
        order.status === 'PAYMENT_CONFIRMED' &&
        order.trackingCode !== '' &&
        order.trackingCode !== 'canceled' &&
        order.orderTracking !== 'PRODUCT_DELIVERED_TO_CLIENT',
    ).sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return dateA.getTime() - dateB.getTime()
    }),
  }))

  const historicOfOrderDeliveredToClient = ordersUsers.map((orderUser) => ({
    ...orderUser,
    Order: orderUser.Order.filter(
      (order) => order.orderTracking === 'PRODUCT_DELIVERED_TO_CLIENT',
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

  const historicOfOrdersCanceled = ordersUsers.map((orderUser) => ({
    ...orderUser,
    Order: orderUser.Order.filter(
      (order) =>
        order.status === 'PAYMENT_CONFIRMED' &&
        order.trackingCode === 'canceled',
    ).sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return dateA.getTime() - dateB.getTime()
    }),
  }))

  return (
    <main className="p-4 max-w-[800px] mx-auto">
      <h1 className="my-6 text-center text-xl font-bold text-amber-500">
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
            Pedidos <strong className="text-green-500">entregue</strong>
          </h3>
          <AreaOrdersOfClients ordersUsers={historicOfOrderDeliveredToClient} />
        </div>

        <div>
          <h3>
            Pedidos <strong className="text-red-500">pendente</strong>,{' '}
            <span className="text-sm text-zinc-300">desistente</span>.
          </h3>
          <AreaOrdersOfClients ordersUsers={uncompletedPaymentUsers} />
        </div>

        <div>
          <h3>
            Pedidos <strong className="text-red-500">cancelado</strong>,{' '}
            <span className="text-sm text-zinc-300">reembolso</span>.
          </h3>
          <AreaOrdersOfClients ordersUsers={historicOfOrdersCanceled} />
        </div>
      </div>
    </main>
  )
}
