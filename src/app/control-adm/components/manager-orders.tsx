import { AreaOrdersOfClients, UserWithOrders } from './area-orders-of-clients'
import { getDataOrdersUsers } from '@/lib/getData/get-data-orders-users'
import { getDataOrders } from '@/lib/getData/get-data-orders'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { OrderWaitingForPayment } from '@/app/orders/components/order-waiting-for-payment'
import { OrderIncludeOrderProducts } from '@/app/orders/page'
import { OrderStatus, OrderStatusTracking } from '@prisma/client'
import { NoUserMessage } from '@/components/no-user-message'

export async function ManageOrders() {
  const { props } = await getDataOrdersUsers()
  const ordersUsers: UserWithOrders[] = JSON.parse(props.ordersUsers)

  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return <NoUserMessage />
  }

  const { props: data } = await getDataOrders(session.user.id)
  const orders: OrderIncludeOrderProducts[] = JSON.parse(data.orders)

  const completedPaymentUsers = ordersUsers.map((orderUser) => ({
    ...orderUser,
    Order: orderUser.Order.filter(
      (order) =>
        order.status === OrderStatus.PAYMENT_CONFIRMED &&
        order.trackingCode === '' &&
        order.orderTracking === OrderStatusTracking.WAITING,
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
        order.status === OrderStatus.PAYMENT_CONFIRMED &&
        order.trackingCode !== '' &&
        order.orderTracking ===
          OrderStatusTracking.PRODUCT_DELIVERED_TO_CORREIOS,
    ).sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return dateA.getTime() - dateB.getTime()
    }),
  }))

  const historicOfOrderDeliveredToClient = ordersUsers.map((orderUser) => ({
    ...orderUser,
    Order: orderUser.Order.filter(
      (order) =>
        order.orderTracking === OrderStatusTracking.PRODUCT_DELIVERED_TO_CLIENT,
    ).sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return dateA.getTime() - dateB.getTime()
    }),
  }))

  const uncompletedPaymentUsers = ordersUsers.map((orderUser) => ({
    ...orderUser,
    Order: orderUser.Order.filter(
      (order) => order.status === OrderStatus.WAITING_FOR_PAYMENT,
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
        order.status === OrderStatus.PAYMENT_CONFIRMED &&
        order.orderTracking === OrderStatusTracking.CANCELED,
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
          Pedidos <strong className="text-base_color_positive">pago</strong>{' '}
          <span className="text-sm">
            {'('}preparar para entrega{')'}
          </span>
        </h3>
        <AreaOrdersOfClients ordersUsers={completedPaymentUsers} />
      </div>

      <div>
        <h3>
          Histórico de Pedidos{' '}
          <strong className="text-base_color_positive">pago</strong>,{' '}
          <span className="text-sm">
            {'('}a caminho{')'}
          </span>
          .
        </h3>
        <AreaOrdersOfClients ordersUsers={historicOfCompletedPaymentUsers} />
      </div>

      <div>
        <h3>
          Pedidos <strong className="text-base_color_positive">entregue</strong>
        </h3>
        <AreaOrdersOfClients ordersUsers={historicOfOrderDeliveredToClient} />
      </div>

      <div>
        <h3>
          Pedidos <strong className="text-base_color_negative">pendente</strong>
          ,{' '}
          <span className="text-sm">
            {'('}desistente{')'}
          </span>
          .
        </h3>
        <AreaOrdersOfClients ordersUsers={uncompletedPaymentUsers} />
      </div>

      <div>
        <h3>
          Pedidos{' '}
          <strong className="text-base_color_negative">cancelado</strong>,{' '}
          <span className="text-sm">
            {'('}reembolso{')'}
          </span>
          .
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
