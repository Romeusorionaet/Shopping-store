import { authOptions } from '@/lib/auth'
import { getDataOrders } from '@/lib/getData/get-data-orders'
import { getServerSession } from 'next-auth'
import { OrderItem } from './components/order-item'
import { OrderWaitingForPayment } from './components/order-waiting-for-payment'
import {
  Order,
  OrderAddress,
  OrderProduct,
  OrderStatus,
  Product,
  UserOrdersHistoric,
} from '@prisma/client'
import { NoUserMessage } from '@/components/no-user-message'
import { getUserOrdersHistoric } from '@/lib/getData/get-data-user-order-historic'
import { HistoricItem } from '@/components/historic-item'

interface OrderProductIncludeProduct extends OrderProduct {
  product: Product
}

export interface OrderIncludeOrderProducts extends Order {
  orderProducts: OrderProductIncludeProduct[]
  orderAddress: OrderAddress[]
}

export default async function Orders() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return <NoUserMessage />
  }

  const { props } = await getDataOrders(session.user.id)
  const orders: OrderIncludeOrderProducts[] = JSON.parse(props.orders)

  const { props: userHistoric } = await getUserOrdersHistoric(session.user.id)
  const historic: UserOrdersHistoric[] = JSON.parse(userHistoric.historic)

  console.log(historic)

  return (
    <div className="pt-28 p-4">
      <div className="border-b border-base_color_dark">
        <h1 className="font-bold">Seus pedidos</h1>
      </div>

      <div className="flex flex-col justify-center mt-4">
        <h2 className="text-lg">Pedidos em andamento:</h2>
        {orders && orders.length >= 1 ? (
          orders.map((order) => {
            if (order.status === OrderStatus.PAYMENT_CONFIRMED) {
              return <OrderItem key={order.id} order={order} />
            } else {
              return (
                <p key={order.id} className="text-center mt-10 opacity-80">
                  Vazio
                </p>
              )
            }
          })
        ) : (
          <p className="text-center mt-10 opacity-80">Vazio</p>
        )}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg">Pedidos entregue:</h2>

        <div className="h-80 overflow-auto scrollbar border border-base_color_dark/20 lg:h-[50rem]">
          <HistoricItem historic={historic} />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-10 h-96 overflow-auto scrollbar">
        <h2 className="text-lg">Pedidos não finalizados</h2>
        <p className="text-sm">
          Se tiver alguma dúvida sobre um produto que não tenha comprado,
          ficaríamos felizes em ajudar. Entre em contato conosco pelo WhatsApp:
          (84) 981127596
        </p>

        <div className="border border-base_color_dark/20 p-2 mt-4">
          {orders && orders.length >= 1 ? (
            orders
              .map((order) => {
                if (order.status === OrderStatus.WAITING_FOR_PAYMENT) {
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
    </div>
  )
}
