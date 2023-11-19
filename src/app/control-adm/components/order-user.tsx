import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { ArrowBigDown } from 'lucide-react'
import { OrderProducts } from './order-products'
import { OrderProps } from './area-orders-of-clients'
import { Input } from '@/components/ui/input'

interface OrdersProps {
  orders: OrderProps[]
}

export function OrderUser({ orders }: OrdersProps) {
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
              const orderStatus =
                order.status === 'WAITING_FOR_PAYMENT' ? 'Pendente' : 'Pago'

              return (
                <div
                  key={order.id}
                  className="space-y-4 bg-slate-800/50 p-2 border-b border-zinc-400/60"
                >
                  <h2>Pedido</h2>
                  <div className="flex justify-between">
                    <p>Status de pagamento:</p>
                    <p>{orderStatus}</p>
                  </div>
                  <div>
                    <p>Inserir código de rastreio</p>
                    <Input />
                  </div>
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
