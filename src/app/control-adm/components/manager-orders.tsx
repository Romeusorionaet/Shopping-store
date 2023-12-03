import { prismaClient } from '@/lib/prisma'
import { AreaOrdersOfClients, UserWithOrders } from './area-orders-of-clients'
import { getDataOrdersUsers } from '@/lib/getData/get-data-orders-users'

export async function ManageOrders() {
  // const { propsOrdersUsers } = await getDataOrdersUsers()
  // const ordersUsers: UserWithOrders[] = JSON.parse(propsOrdersUsers.ordersUsers)
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
    </div>
  )
}
