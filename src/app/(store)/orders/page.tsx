import { fetchDataBuyerOrders } from '@/actions/get/buyer/fetch-data-buyer-orders'
import { OrderItem } from './components/order-item'
import { NoUserMessage } from '@/components/no-user-message'
import {
  OrderProps,
  OrderStatus,
  OrderStatusTracking,
} from '@/core/@types/api-store'
import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'

export default async function Orders() {
  const accessToken = await getAccessTokenFromCookies()

  if (!accessToken) {
    return <NoUserMessage />
  }

  const { props } = await fetchDataBuyerOrders()

  if (!props) {
    return
  }

  const orders: OrderProps[] = JSON.parse(props.orders)

  if (orders.length === 0) {
    return <p className="pt-52 text-center">Realize uma compra...</p>
  }

  const paymentConfirmed = OrderStatus.PAYMENT_CONFIRMED

  const ordersInProcess =
    OrderStatusTracking.WAITING ||
    OrderStatusTracking.PRODUCT_DELIVERED_TO_CARRIER

  const productDeliveredToClient =
    OrderStatusTracking.PRODUCT_DELIVERED_TO_CLIENT

  return (
    <div className="px-4 py-28">
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
              return <></>
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
                return <></>
              }
            })}
        </div>
      </div>
    </div>
  )
}
