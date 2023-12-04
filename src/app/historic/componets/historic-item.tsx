'use client'

import { getOrderStatus } from '@/components/helpers/get-order-status'
import { HistoricOrder } from '@prisma/client'
import { Separator } from '@radix-ui/react-separator'
import { format } from 'date-fns'

interface Props {
  historic: HistoricOrder[]
}

export function HistoricItem({ historic }: Props) {
  if (historic.length === 0) {
    return <p>Não há registro de compras.</p>
  }

  return (
    <div className="border-b border-zinc-400 pb-4">
      {historic &&
        historic.map((item) => {
          const totalDiscount =
            Number(item.basePrice) * (item.discountPercentage / 100)
          const totalPrice = Number(item.basePrice) - totalDiscount

          return (
            <div key={item.id} className="space-y-2">
              <p>
                Produto <strong>{item.name}</strong>
              </p>

              <div className="flex justify-between">
                <p>Quantidade: {item.quantity}</p>
                <p>{getOrderStatus(item.status)}</p>
              </div>

              <div className="flex items-center justify-between text-xs">
                <p>Subtotal</p>
                <p>
                  {Number(item.basePrice).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>

              <Separator className="opacity-20" />

              <div className="flex items-center justify-between text-xs">
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

              <Separator className="opacity-20" />

              <div className="flex items-center justify-between text-sm font-bold">
                <p>Total</p>
                <p>
                  {totalPrice.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
              {/* <p>{format(new Date(item.createdAt), "d/MM/y 'às' HH:mm")}</p> */}
            </div>
          )
        })}
    </div>
  )
}
