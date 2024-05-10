import { OrderProductProps } from './order-item'
import { format, isWithinInterval, sub } from 'date-fns'

export function OrderWaitingForPayment({ order }: OrderProductProps) {
  const oneMonthAgo = sub(new Date(), { months: 1 })

  const orderDate = new Date(order.createdAt)
  const isOrderWithinOneMonth = isWithinInterval(orderDate, {
    start: oneMonthAgo,
    end: new Date(),
  })

  if (!isOrderWithinOneMonth) {
    return null
  }

  return (
    <div className="text-xs">
      <p>
        Compra não finalizada.
        {order.orderProducts.map((product: any) => (
          <strong key={product.id}> ({product.product.name}), </strong>
        ))}
      </p>
      <span>{format(new Date(order.createdAt), "d/MM/y 'às' HH:mm")}</span>
    </div>
  )
}
