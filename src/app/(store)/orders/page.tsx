import { getDataOrders } from '@/lib/getData/get-data-orders'
import { getServerSession } from 'next-auth'
import { OrderItem } from './components/order-item'
import { OrderWaitingForPayment } from './components/order-waiting-for-payment'
// import {
//   Order,
//   OrderAddress,
//   OrderProduct,
//   OrderStatus,
//   Product,
//   UserOrdersHistoric,
// } from '@prisma/client'
import { NoUserMessage } from '@/components/no-user-message'
import { getUserOrdersHistoric } from '@/lib/getData/get-data-user-order-historic'
import { HistoricItem } from '@/components/historic-item'

// interface OrderProductIncludeProduct extends OrderProduct {
//   product: Product
// }

// export interface OrderIncludeOrderProducts extends Order {
//   orderProducts: OrderProductIncludeProduct[]
//   orderAddress: OrderAddress[]
// }

export default async function Orders() {
  // if (!session || !session.user) {
  //   return <NoUserMessage />
  // }

  // const { props } = await getDataOrders(session.user.id)
  // const orders: OrderIncludeOrderProducts[] = JSON.parse(props.orders)

  // const { props: userHistoric } = await getUserOrdersHistoric(session.user.id)
  // const historic: UserOrdersHistoric[] = JSON.parse(userHistoric.historic)

  return (
    <div className="p-4 pt-28">
      <div className="border-b border-base_color_dark">
        <h1 className="font-bold">Seus pedidos</h1>
      </div>

      <div className="mt-4 flex flex-col justify-center">
        <h2 className="text-lg">Pedidos em andamento:</h2>
        {/* {orders && orders.length >= 1 ? (
          orders.map((order) => {
            if (order.status === OrderStatus.PAYMENT_CONFIRMED) {
              return <OrderItem key={order.id} order={order} />
            } else {
              return (
                <p key={order.id} className="mt-10 text-center opacity-80">
                  Vazio
                </p>
              )
            }
          })
        ) : (
          <p className="mt-10 text-center opacity-80">Vazio</p>
        )} */}
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-lg">Pedidos entregue:</h2>

        <div className="scrollbar h-80 overflow-auto border border-base_color_dark/20 lg:h-[50rem]">
          {/* <HistoricItem historic={historic} /> */}
        </div>
      </div>

      <div className="scrollbar mt-10 flex h-96 flex-col gap-2 overflow-auto">
        <h2 className="text-lg">Pedidos não finalizados</h2>
        <p className="text-sm">
          Se tiver alguma dúvida sobre um produto que não tenha comprado,
          ficaríamos felizes em ajudar. Entre em contato conosco pelo WhatsApp:
          (84) 981127596
        </p>

        <div className="mt-4 border border-base_color_dark/20 p-2">
          {/* {orders && orders.length >= 1 ? (
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
          )} */}
        </div>
      </div>
    </div>
  )
}
