import { AreaOrdersOfClients, UserWithOrders } from './area-orders-of-clients'
import { getDataOrdersUsers } from '@/lib/getData/get-data-orders-users'
import { getDataOrders } from '@/lib/getData/get-data-orders'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Order, OrderProduct, Product } from '@prisma/client'
import { OrderWaitingForPayment } from '@/app/orders/components/order-waiting-for-payment'

interface OrderProductIncludeProduct extends OrderProduct {
  product: Product
}

export interface OrderIncludeOrderProducts extends Order {
  orderProducts: OrderProductIncludeProduct[]
}

export async function ManageOrders() {
  const { props } = await getDataOrdersUsers()
  const ordersUsers: UserWithOrders[] = JSON.parse(props.ordersUsers)

  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return <h1>Sem usuário logado</h1>
  }

  const { props: data } = await getDataOrders(session.user.id)
  const orders: OrderIncludeOrderProducts[] = JSON.parse(data.orders)

  const completedPaymentUsers = ordersUsers.map((orderUser) => ({
    ...orderUser,
    Order: orderUser.Order.filter(
      (order) =>
        order.status === 'PAYMENT_CONFIRMED' &&
        order.trackingCode === '' &&
        order.orderTracking === 'WAITING',
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
        order.orderTracking === 'PRODUCT_DELIVERED_TO_CORREIOS',
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
        order.orderTracking === 'CANCELED',
    ).sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return dateA.getTime() - dateB.getTime()
    }),
  }))

  return (
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
          Histórico de Pedidos <strong className="text-green-500">pago</strong>,{' '}
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

      <div>
        <h1>Seus pedidos não finalizados</h1>
        <p className="opacity-80 text-sm">{session.user.email}</p>
      </div>

      <div className="flex flex-col gap-2 mt-10 h-96 overflow-auto scrollbar opacity-80">
        {orders && orders.length >= 1 ? (
          orders
            .map((order) => {
              if (order.status === 'WAITING_FOR_PAYMENT') {
                return <OrderWaitingForPayment key={order.id} order={order} />
              } else {
                return null
              }
            })
            .reverse()
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
