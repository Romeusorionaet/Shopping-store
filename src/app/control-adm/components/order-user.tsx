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
import { Address } from '@prisma/client'
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
      className="border border-zinc-500/60 p-1 rounded-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="group flex justify-end w-full">
          <ArrowBigDown className="group-data-[state=open]:rotate-180 duration-700" />
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-6">
            {orders.map((order) => {
              const confirmedPaymentNoTrackingCode =
                order.status === 'PAYMENT_CONFIRMED' &&
                order.trackingCode === ''

              const isOrderDeliveredToCarreios =
                order.orderTracking === 'PRODUCT_DELIVERED_TO_CORREIOS' &&
                order.trackingCode !== '' &&
                order.trackingCode !== 'canceled'

              return (
                <div
                  key={order.id}
                  className="space-y-4 bg-slate-800/50 p-2 border-b border-zinc-400/60"
                >
                  <div className="flex justify-between">
                    <h2 className="font-bold">Pedido</h2>
                    <span className="text-sm text-zinc-300">
                      {format(new Date(order.createdAt), "d/MM/y 'às' HH:mm")}
                    </span>
                  </div>

                  <div>
                    <p>
                      Status de pagamento:{' '}
                      <span className="text-sm text-zinc-300">
                        {getOrderStatus(order.status)}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p>Código de rastreio:</p>
                    <p className="text-sm text-zinc-300">
                      #{order.trackingCode && order.trackingCode}
                    </p>
                  </div>

                  {order.orderTracking === 'PRODUCT_DELIVERED_TO_CLIENT' && (
                    <p className="border-x border-green-500 inline-block p-1 rounded-md">
                      pedido entregue
                    </p>
                  )}

                  {confirmedPaymentNoTrackingCode && (
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
