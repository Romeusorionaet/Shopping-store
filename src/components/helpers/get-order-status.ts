import { OrderStatus, OrderStatusTracking } from '@prisma/client'

export const getOrderStatus = (
  orderStatus: OrderStatus | OrderStatusTracking | string,
) => {
  return {
    [OrderStatus.PAYMENT_CONFIRMED]: 'Pago',
    [OrderStatus.WAITING_FOR_PAYMENT]: 'Pendente',
    [OrderStatusTracking.WAITING]: 'Aguardando',
    [OrderStatusTracking.CANCELED]: 'Reembolso',
    [OrderStatusTracking.PRODUCT_DELIVERED_TO_CORREIOS]: 'Entregue no correio',
    [OrderStatusTracking.PRODUCT_DELIVERED_TO_CLIENT]: 'Entrgue ao cliente',
  }[orderStatus]
}
