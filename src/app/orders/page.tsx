import { authOptions } from '@/lib/auth'
import { getDataOrders } from '@/lib/getData/get-data-orders'
import { getServerSession } from 'next-auth'
import { OrderItem } from './components/order-item'
import { OrderWaitingForPayment } from './components/order-waiting-for-payment'
import { Order, OrderProduct, Product } from '@prisma/client'

interface OrderProductIncludeProduct extends OrderProduct {
  product: Product
}

export interface OrderIncludeOrderProducts extends Order {
  orderProducts: OrderProductIncludeProduct[]
}

export default async function Orders() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return <h1>Sem usuário logado</h1>
  }

  const { props } = await getDataOrders(session.user.id)
  const orders: OrderIncludeOrderProducts[] = JSON.parse(props.orders)

  return (
    <div className="pt-28 p-4 max-w-[800px] mx-auto">
      <div>
        <h1>Seus pedidos</h1>
      </div>

      <div className="flex flex-col justify-center mt-4">
        {orders && orders.length >= 1 ? (
          orders.map((order) => {
            if (order.status === 'PAYMENT_CONFIRMED') {
              return <OrderItem key={order.id} order={order} />
            } else {
              return null
            }
          })
        ) : (
          <p className="text-center mt-8 opacity-80">
            Você ainda não fez nem uma compra
          </p>
        )}
      </div>

      <div className="flex flex-col gap-2 mt-10 h-96 overflow-auto scrollbar">
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
