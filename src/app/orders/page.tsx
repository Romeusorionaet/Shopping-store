import { authOptions } from '@/lib/auth'
import { getDataOrders } from '@/lib/getData/get-data-orders'
import { getServerSession } from 'next-auth'
import { OrderItem } from './components/order-item'

export default async function Orders() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    return <h1>Sem usuário logado</h1>
  }

  const { props } = await getDataOrders(session.user.id)
  const orders = props.orders

  return (
    <div>
      <div className="my-10">
        <h1>Seus pedidos</h1>
      </div>

      <div className="flex flex-col justify-center">
        {orders &&
          orders.map((order) => {
            if (order.status === 'PAYMENT_CONFIRMED') {
              return <OrderItem key={order.id} order={order} />
            } else {
              return <></>
            }
          })}
      </div>
    </div>
  )
}
