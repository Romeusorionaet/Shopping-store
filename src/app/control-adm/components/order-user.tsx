import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { ArrowBigDown } from 'lucide-react'
import { OrderProducts } from './order-products'
import { OrderProps } from './area-orders-of-clients'
import { getOrderStatus } from '@/components/helpers/get-order-status'
import { InsertTrackingCode } from './insert-tracking-code'
import { format } from 'date-fns'
import { Address, OrderStatus, OrderStatusTracking } from '@prisma/client'
import { SavedUserAddress } from '@/components/saved-user-address'
import { OrderDelivered } from './order-delivered'

interface OrdersProps {
  orders: OrderProps[]
  address: Address[]
}

export function OrderUser({ orders, address }: OrdersProps) {
  const [userAddress] = address

  return (
    <Accordion
      type="single"
      collapsible
      className="border border-white/20 p-1 rounded-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="group flex justify-end w-full">
          <ArrowBigDown className="group-data-[state=open]:rotate-180 duration-700" />
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-6">
            {orders.map((order) => {
              const isPaymentConfirmedNoTracking =
                order.status === OrderStatus.PAYMENT_CONFIRMED &&
                order.trackingCode === '' &&
                order.orderTracking !== OrderStatusTracking.CANCELED

              const isOrderDeliveredToCarreios =
                order.orderTracking ===
                  OrderStatusTracking.PRODUCT_DELIVERED_TO_CORREIOS &&
                order.trackingCode !== '' &&
                order.trackingCode !== OrderStatusTracking.CANCELED

              return (
                <div
                  key={order.id}
                  className="space-y-4 bg-base_color_dark/5 p-2 border-b border-white/20"
                >
                  <div className="flex justify-between">
                    <h2 className="font-bold">Pedido</h2>
                    <span className="text-sm opacity-80">
                      {format(new Date(order.createdAt), "d/MM/y 'às' HH:mm")}
                    </span>
                  </div>

                  <div>
                    <p>
                      Status:{' '}
                      <span className="text-sm opacity-80">
                        {getOrderStatus(order.orderTracking)}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p>Código de rastreio:</p>
                    <p className="text-sm opacity-80">
                      #{order.trackingCode && order.trackingCode}
                    </p>
                  </div>

                  {order.orderTracking ===
                    OrderStatusTracking.PRODUCT_DELIVERED_TO_CLIENT && (
                    <p className="border-x border-base_color_positive inline-block p-1 rounded-md">
                      pedido entregue
                    </p>
                  )}

                  {isPaymentConfirmedNoTracking && (
                    <InsertTrackingCode orderId={order.id} />
                  )}

                  {isOrderDeliveredToCarreios && (
                    <OrderDelivered orderId={order.id} />
                  )}

                  <SavedUserAddress userAddress={userAddress} />

                  <OrderProducts ordersProducts={order.orderProducts} />
                </div>
              )
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
