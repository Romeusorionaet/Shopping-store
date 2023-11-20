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
import { Teste } from './teste'
import { Address } from '@prisma/client'
import { SavedUserAddress } from '@/components/saved-user-address'

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

              return (
                <div
                  key={order.id}
                  className="space-y-4 bg-slate-800/50 p-2 border-b border-zinc-400/60"
                >
                  <div className="flex justify-between">
                    <h2 className="font-bold">Pedido</h2>
                    <span className="text-sm text-zinc-300">
                      {format(order.createdAt, "d/MM/y 'às' HH:mm")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <p>Status de pagamento:</p>
                    <p className="text-sm text-zinc-300">
                      {getOrderStatus(order.status)}
                    </p>
                  </div>

                  <div>
                    <p>Código de rastreio:</p>
                    <p className="text-sm text-zinc-300">
                      #{order.trackingCode && order.trackingCode}
                    </p>
                  </div>

                  {confirmedPaymentNoTrackingCode && (
                    <InsertTrackingCode orderId={order.id} />
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
