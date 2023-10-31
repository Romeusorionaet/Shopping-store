import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Prisma } from '@prisma/client'
import { format } from 'date-fns'
import { getOrderStatus } from '../helpers/get-order-status'
import OrderProductItem from './order-product-item'
import { Button } from '@/components/ui/button'

export interface OrderProductProps {
  order: Prisma.OrderGetPayload<{
    include: {
      orderProducts: {
        include: { product: true }
      }
    }
  }>
}

export function OrderItem({ order }: OrderProductProps) {
  const { orderProducts } = order
  let subtotal = 0
  let totalDiscount = 0
  let total = 0

  orderProducts.forEach((item) => {
    const currentTotalDiscount =
      Number(item.basePrice) * (item.discountPercentage / 100) * item.quantity
    const currentTotalPrice =
      Number(item.basePrice) * item.quantity - currentTotalDiscount
    subtotal += Number(item.basePrice) * item.quantity
    totalDiscount += currentTotalDiscount
    total += currentTotalPrice
  })

  return (
    <div className="px-5">
      <Accordion type="single" className="w-full" collapsible>
        <AccordionItem value={order.id}>
          <AccordionTrigger>
            <div className="flex flex-col gap-1 my-4">
              <p className="text-sm font-bold uppercase">
                Pedido com {order.orderProducts.length} produto(s)
              </p>
              <span className="text-xs opacity-60">
                {/* order.trackingCode */}
                Código de restreio: <strong>54564584</strong>
              </span>
            </div>
          </AccordionTrigger>

          <AccordionContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="font-bold">
                  <p>Status</p>
                  <p className="text-[#8162FF]">
                    {getOrderStatus(order.status)}
                  </p>
                </div>

                <div>
                  <p className="font-bold">Data</p>
                  <p className="opacity-60">
                    {format(order.createdAt, "d/MM/y 'às' HH:mm")}
                  </p>
                </div>

                <div>
                  <p className="font-bold">Pagamento</p>
                  <p className="opacity-60">Cartão</p>
                </div>
              </div>

              {order.orderProducts.map((orderProduct) => (
                <OrderProductItem
                  key={orderProduct.id}
                  orderProduct={orderProduct}
                />
              ))}

              <div className="flex w-full flex-col gap-1 text-xs">
                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Subtotal</p>
                  <p>R$ {subtotal.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Entrega</p>
                  <p>GRÁTIS</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3">
                  <p>Descontos</p>
                  <p>-R$ {totalDiscount.toFixed(2)}</p>
                </div>

                <Separator />

                <div className="flex w-full justify-between py-3 text-sm font-bold">
                  <p>Total</p>
                  <p>R$ {total.toFixed(2)}</p>
                </div>
              </div>

              <div>
                <Button>Acompanhar pedido</Button>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
