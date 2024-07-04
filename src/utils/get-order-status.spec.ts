import { OrderStatus, OrderStatusTracking } from '@/core/@types/api-store'
import { getOrderStatus } from './get-order-status'

describe('Get Order status', () => {
  test('should be able return the any order status', () => {
    const orderStatus = getOrderStatus({
      status: OrderStatus.PAYMENT_CONFIRMED,
    })

    expect(orderStatus).toEqual('Pago')

    const orderStatusTracking = getOrderStatus({
      status: OrderStatusTracking.PRODUCT_DELIVERED_TO_CLIENT,
    })

    expect(orderStatusTracking).toEqual('Entregue ao cliente')
  })
})
