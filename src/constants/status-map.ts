import { OrderStatus, OrderStatusTracking } from '@/core/@types/api-store'

export const orderStatusMap = {
  [OrderStatus.PAYMENT_CONFIRMED]: 'Pago',
  [OrderStatus.WAITING_FOR_PAYMENT]: 'Pendente',
}

export const orderStatusTrackingMap = {
  [OrderStatusTracking.WAITING]: 'Aguardando',
  [OrderStatusTracking.CANCELED]: 'Reembolso',
  [OrderStatusTracking.PRODUCT_DELIVERED_TO_CARRIER]: 'Entregue no correio',
  [OrderStatusTracking.PRODUCT_DELIVERED_TO_CLIENT]: 'Entregue ao cliente',
}
