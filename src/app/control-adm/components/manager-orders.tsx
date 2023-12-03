import { prismaClient } from '@/lib/prisma'
import { AreaOrdersOfClients, UserWithOrders } from './area-orders-of-clients'
import { getDataOrdersUsers } from '@/actions/get-data-orders-users'

export async function ManageOrders() {
  const data = await getDataOrdersUsers()
  // const ordersUsers: UserWithOrders[] = JSON.parse(props.ordersUsers)

  // const ordersUsers = await prismaClient.user.findMany({
  //   where: {
  //     Order: {
  //       some: {
  //         id: {
  //           not: undefined,
  //         },
  //       },
  //     },
  //   },
  //   include: {
  //     Order: {
  //       include: {
  //         orderProducts: {
  //           include: {
  //             product: true,
  //           },
  //         },
  //       },
  //     },
  //     Address: true,
  //   },
  // })

  if (data.message) {
    return <p>data.message</p>
  }

  if (!data.ordersUsers) {
    return <p>Nem um pedido foi encontrado</p>
  }

  const completedPaymentUsers = data.ordersUsers.map((orderUser) => ({
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

  const historicOfCompletedPaymentUsers = data.ordersUsers.map((orderUser) => ({
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

  const historicOfOrderDeliveredToClient = data.ordersUsers.map(
    (orderUser) => ({
      ...orderUser,
      Order: orderUser.Order.filter(
        (order) => order.orderTracking === 'PRODUCT_DELIVERED_TO_CLIENT',
      ).sort((a, b) => {
        const dateA = new Date(a.createdAt)
        const dateB = new Date(b.createdAt)

        return dateA.getTime() - dateB.getTime()
      }),
    }),
  )

  const uncompletedPaymentUsers = data.ordersUsers.map((orderUser) => ({
    ...orderUser,
    Order: orderUser.Order.filter(
      (order) => order.status === 'WAITING_FOR_PAYMENT',
    ).sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return dateB.getTime() - dateA.getTime()
    }),
  }))

  const historicOfOrdersCanceled = data.ordersUsers.map((orderUser) => ({
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
