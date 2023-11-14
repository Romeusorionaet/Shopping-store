import { OrderProductProps } from './order-item'
import { format } from 'date-fns'

export function OrderWaitingForPayment({ order }: OrderProductProps) {
  return (
    <div className="text-xs">
      <p>
        Volte ao carrinho e finalize sua compra.{' '}
        {order.orderProducts.map((product) => (
          <strong key={product.id}>({product.product.name}), </strong>
        ))}
      </p>
      <span>{format(order.createdAt, "d/MM/y 'às' HH:mm")}</span>
    </div>
  )
}
