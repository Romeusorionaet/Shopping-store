import { OrderStatus, OrderStatusTracking } from '@/core/@types/api-store'

const orderStatusMap = {
  [OrderStatus.PAYMENT_CONFIRMED]: 'Pago',
  [OrderStatus.WAITING_FOR_PAYMENT]: 'Pendente',
}

const orderStatusTrackingMap = {
  [OrderStatusTracking.WAITING]: 'Aguardando',
  [OrderStatusTracking.CANCELED]: 'Reembolso',
  [OrderStatusTracking.PRODUCT_DELIVERED_TO_CARRIER]: 'Entregue no correio',
  [OrderStatusTracking.PRODUCT_DELIVERED_TO_CLIENT]: 'Entregue ao cliente',
}

export const getOrderStatus = (
  orderStatus: OrderStatus | OrderStatusTracking | string,
) => {
  return (
    orderStatusMap[orderStatus as OrderStatus] ||
    orderStatusTrackingMap[orderStatus as OrderStatusTracking]
  )
}
