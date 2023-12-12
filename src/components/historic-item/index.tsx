'use client'

import { UserOrdersHistoric } from '@prisma/client'
import { Separator } from '@radix-ui/react-separator'
import { format } from 'date-fns'
import Image from 'next/image'

interface Props {
  historic: UserOrdersHistoric[]
}

export function HistoricItem({ historic }: Props) {
  const sortedHistoric = historic.sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)
    return dateB.getTime() - dateA.getTime()
  })

  if (sortedHistoric.length === 0) {
    return (
      <div className="flex h-screen justify-center items-start">
        <div className="border border-white/20 p-4 rounded-md">
          <p className="opacity-80">Sem registro de compras...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-8 flex-wrap justify-center mt-20">
      {sortedHistoric.map((item) => {
        const totalDiscount =
          Number(item.basePrice) * (item.discountPercentage / 100)
        const totalPrice = Number(item.basePrice) - totalDiscount

        return (
          <div
            key={item.id}
            className="space-y-2 border-b border-base_color_dark/20 pb-4 w-60 text-sm"
          >
            <div>
              {' '}
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-52 object-contain"
                src={item.imageUrl}
                alt={item.name}
              />
            </div>

            <p>
              Produto <strong>{item.name}</strong>
            </p>

            <p>
              Comprado em:{' '}
              <strong>
                {format(new Date(item.createdAt), "d/MM/y 'às' HH:mm")}
              </strong>
            </p>

            <p>
              Entregue em:{' '}
              <strong>
                {format(new Date(item.updatedAt), "d/MM/y 'às' HH:mm")}
              </strong>
            </p>

            <div className="flex justify-between">
              <p>
                Quantidade:<strong> {item.quantity}</strong>
              </p>
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

            <div className="flex items-center justify-between text-xs">
              {item.discountPercentage}% off
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
          </div>
        )
      })}
    </div>
  )
}
