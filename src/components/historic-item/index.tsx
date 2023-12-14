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
      <div className="flex h-screen items-start justify-center">
        <div className="rounded-md border border-white/20 p-4">
          <p className="opacity-80">Sem registro de compras...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mt-20 flex flex-wrap justify-center gap-8">
      {sortedHistoric.map((item) => {
        const totalDiscount =
          Number(item.basePrice) * (item.discountPercentage / 100)
        const totalPrice = Number(item.basePrice) - totalDiscount

        return (
          <div
            key={item.id}
            className="w-60 space-y-2 border-b border-base_color_dark/20 pb-4 text-sm"
          >
            <div>
              {' '}
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="h-52 w-full object-contain"
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

            <div>
              <h2>Endereço:</h2>

              {/* <div>
                <p>
                  <span className="font-bold">Nome</span>: {historic.username}
                </p>
                <p>
                  <span className="font-bold">Email</span>: {historic.email}
                </p>
                <p>
                  <span className="font-bold">Contanto</span>:{' '}
                  {address.phoneNumber}
                </p>
                <p>
                  <span className="font-bold">CEP</span>: {historic.cep}
                </p>
                <p>
                  <span className="font-bold">Cidade</span>: {historic.city}
                </p>
                <p>
                  <span className="font-bold">UF</span>: {historic.uf}
                </p>
                <p>
                  <span className="font-bold">Bairro</span>:{' '}
                  {historic.neighborhood}
                </p>
                <p>
                  <span className="font-bold">Rua</span>: {historic.street}
                </p>
                <p>
                  <span className="font-bold">Número</span>: {historic.number}
                </p>
                <p>
                  <span className="font-bold">Complemento</span>:{' '}
                  {historic.complement}
                </p>
              </div> */}
            </div>
          </div>
        )
      })}
    </div>
  )
}
