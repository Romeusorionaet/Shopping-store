import { orderStatusMap, orderStatusTrackingMap } from '@/constants/status-map'
import { OrderStatus, OrderStatusTracking } from '@/core/@types/api-store'

interface Props {
  status: OrderStatus | OrderStatusTracking | string
}

export const getOrderStatus = ({ status }: Props) => {
  return (
    orderStatusMap[status as OrderStatus] ||
    orderStatusTrackingMap[status as OrderStatusTracking]
  )
}
