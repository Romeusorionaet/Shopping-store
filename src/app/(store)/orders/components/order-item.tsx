'use client'

import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { OrderProductItem } from './order-product-item'
import { FixedAddressInformation } from '@/components/address-information/fixed-address-information'
import { OrderProps, OrderStatusTracking } from '@/core/@types/api-store'
import { getOrderStatus } from '@/utils/get-order-status'

interface Props {
  order: OrderProps
}

export function OrderItem({ order }: Props) {
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

  const isProductDeliveredToCorreios =
    order.orderStatusTracking !==
      OrderStatusTracking.PRODUCT_DELIVERED_TO_CARRIER ||
    order.trackingCode === OrderStatusTracking.CANCELED

  const handleNavigateToCorreiosPage = () => {
    open('https://www.correios.com.br/')
  }

  const orderDelivered =
    order.orderStatusTracking ===
    OrderStatusTracking.PRODUCT_DELIVERED_TO_CLIENT

  return (
    <Accordion type="single" className="w-full" collapsible>
      <AccordionItem value={order.id}>
        <AccordionTrigger>
          <div className="my-4 flex flex-col gap-1 text-start">
            <p className="text-sm font-bold uppercase">
              Pedido com {order.orderProducts.length} produto(s)
            </p>
            {order.orderStatusTracking ===
            OrderStatusTracking.CANCELED.toString() ? (
              <p className="text-xs opacity-60">
                pedido cancelado: Este pedido foi{' '}
                <span className="text-base_color_negative">cancelado</span> por
                motivos de reembolso.
              </p>
            ) : order.trackingCode !== '' ? (
              <p
                data-delivered={orderDelivered}
                className="text-xs opacity-60 data-[delivered=true]:hidden"
              >
                Copie este código de restreio e clique em &quot;
                <span className="text-base_color_positive">
                  Acompanhar pedido
                </span>
                &quot; no botão abaixo:
                <strong> {order.trackingCode}</strong>
              </p>
            ) : (
              <p className="text-sm opacity-60">
                Estamos preparando o seu produto para envio. Em até 5 dias
                úteis, o seu pedido estará pronto para ser entregue à agência
                dos Correios. Assim que despachado, você receberá o código de
                rastreamento para acompanhar a entrega.
              </p>
            )}
          </div>
        </AccordionTrigger>

        <AccordionContent>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="font-bold">
                <p>Status</p>
                {order.orderStatusTracking ===
                OrderStatusTracking.CANCELED.toString() ? (
                  <p className="text-base_color_negative">
                    {getOrderStatus(order.orderStatusTracking)}
                  </p>
                ) : (
                  <p className="text-base_color_positive">
                    {getOrderStatus(order.status)}
                  </p>
                )}
              </div>

              <div>
                <p className="font-bold">Pedido:</p>
                <p className="opacity-60">
                  {format(new Date(order.createdAt), "d/MM/y 'às' HH:mm")}
                </p>
                <p>
                  <strong>{getOrderStatus(order.orderStatusTracking)}</strong>:
                </p>
                <p>
                  {order.updatedAt
                    ? format(new Date(order.updatedAt), "d/MM/y 'às' HH:mm")
                    : ''}
                </p>
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

              <div className="flex w-full justify-between py-2">
                <p>Subtotal</p>
                <p>
                  {subtotal.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <Separator />

              <div className="flex w-full justify-between py-2">
                <p>Entrega</p>
                <p>GRÁTIS</p>
              </div>

              <Separator />

              <div className="flex w-full justify-between py-2">
                <p>Descontos</p>
                <p>
                  -
                  {totalDiscount.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <Separator />

              <div className="flex w-full justify-between py-2 text-sm font-bold">
                <p>Total</p>
                <p>
                  {total.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            <FixedAddressInformation address={order.buyerAddress} />

            <div>
              <Button
                data-delivered={orderDelivered}
                disabled={isProductDeliveredToCorreios}
                className="rounded-md bg-base_color_positive p-2 data-[delivered=true]:hidden sm:w-56"
                onClick={handleNavigateToCorreiosPage}
              >
                Acompanhar pedido
              </Button>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
