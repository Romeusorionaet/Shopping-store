'use client'

import { useEffect, useState } from 'react'
import { AreaOrdersOfClients, UserWithOrders } from './area-orders-of-clients'
import { useSession } from 'next-auth/react'
import axios from 'axios'

interface PropsOrdersUsers {
  ordersUsers: UserWithOrders[]
}

export function ManageOrders() {
  const [dataOrders, setDataOrders] = useState<PropsOrdersUsers | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { data } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = data?.user.id

        const config = {
          headers: {
            'X-User-ID': userId,
          },
        }

        const result: PropsOrdersUsers = await axios
          .get(
            'https://shopping-store-kappa.vercel.app/api/order/orders-users',
            config,
          )
          .then((response) => response.data)
          .catch((err) => err)

        setDataOrders(result)
      } catch (err) {
        console.log(`Ocorreu um erro. Por favor, tente novamente mais tarde.`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [data])

  if (isLoading) {
    return <p>Carregando...</p>
  }

  if (
    !dataOrders ||
    !dataOrders.ordersUsers ||
    dataOrders.ordersUsers.length === 0
  ) {
    return <p>Nem um pedido foi encontrado.</p>
  }

  const completedPaymentUsers = dataOrders.ordersUsers.map((orderUser) => ({
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

  const historicOfCompletedPaymentUsers = dataOrders.ordersUsers.map(
    (orderUser) => ({
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
    }),
  )

  const historicOfOrderDeliveredToClient = dataOrders.ordersUsers.map(
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

  const uncompletedPaymentUsers = dataOrders.ordersUsers.map((orderUser) => ({
    ...orderUser,
    Order: orderUser.Order.filter(
      (order) => order.status === 'WAITING_FOR_PAYMENT',
    ).sort((a, b) => {
      const dateA = new Date(a.createdAt)
      const dateB = new Date(b.createdAt)

      return dateB.getTime() - dateA.getTime()
    }),
  }))

  const historicOfOrdersCanceled = dataOrders.ordersUsers.map((orderUser) => ({
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
