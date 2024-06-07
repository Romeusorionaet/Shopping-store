import { getServerSession } from 'next-auth'
import { OrderItem } from './components/order-item'
import { NoUserMessage } from '@/components/no-user-message'
import {
  OrderProps,
  OrderStatus,
  OrderStatusTracking,
} from '@/core/@types/api-store'
import { getDataBuyerOrders } from '@/actions/get/buyer/get-data-buyer-orders'

export default async function Orders() {
  const session = await getServerSession()

  if (!session || !session.user) {
    return <NoUserMessage />
  }

  const { props } = await getDataBuyerOrders()
  const orders: OrderProps[] = JSON.parse(props.orders)

  const paymentConfirmed = OrderStatus.PAYMENT_CONFIRMED
  const ordersInProcess =
    OrderStatusTracking.WAITING ||
    OrderStatusTracking.PRODUCT_DELIVERED_TO_CARRIER

  const productDeliveredToClient =
    OrderStatusTracking.PRODUCT_DELIVERED_TO_CLIENT

  return (
    <div className="p-4 pt-28">
      <div className="border-b border-base_color_dark">
        <h1 className="font-bold">Seus pedidos</h1>
      </div>

      <div className="mt-4 flex flex-col justify-center">
        <h2 className="text-lg">Pedidos em andamento:</h2>

        {orders.length >= 1 &&
          orders.map((order) => {
            if (
              order.status === paymentConfirmed &&
              order.orderStatusTracking === ordersInProcess
            ) {
              return <OrderItem key={order.id} order={order} />
            } else {
              return (
                <>
                  <p className="mt-4 font-light">Realize uma compra</p>
                </>
              )
            }
          })}
      </div>

      <div className="mt-10">
        <h2 className="text-lg">Pedidos entregue:</h2>

        <div className="mt-4 flex flex-col justify-center">
          {orders.length >= 1 &&
            orders.map((order) => {
              if (order.orderStatusTracking === productDeliveredToClient) {
                return <OrderItem key={order.id} order={order} />
              } else {
                return (
                  <>
                    <p className="font-light">Vazio</p>
                  </>
                )
              }
            })}
        </div>
      </div>
    </div>
  )
}
