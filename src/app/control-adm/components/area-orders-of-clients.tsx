'use client'

import { Input } from '@/components/ui/input'
import { Address, OrderProduct, Product } from '@prisma/client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { useMemo, useState } from 'react'
import { OrderUser } from './order-user'

export interface OrderProducts extends OrderProduct {
  product: Product
}

export interface OrderProps {
  id: string
  status: string
  userId: string
  createdAt: Date
  updatedAt: Date
  trackingCode: string
  orderProducts: OrderProducts[]
}

interface UserWithOrders {
  id: string
  name: string | null
  email: string | null
  image: string | null
  Order: OrderProps[]
  Address: Address[]
}

interface OrdersUsersProps {
  ordersUsers: UserWithOrders[]
}

export function AreaOrdersOfClients({ ordersUsers }: OrdersUsersProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOrdersUsers = ordersUsers.filter(
    (orderUser) =>
      orderUser.name &&
      orderUser.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const ordersSize = useMemo(() => {
    return ordersUsers.reduce((totalOrders, orderUser) => {
      return totalOrders + orderUser.Order.length
    }, 0)
  }, [ordersUsers])

  const hasOrders = ordersSize > 0

  return (
    <Accordion
      type="single"
      collapsible
      className="border border-zinc-500/60 my-4 p-2 rounded-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex justify-between w-full">
          <p>Todos os pedidos</p>
          {hasOrders && (
            <span className="font-bold bg-green-500 text-zinc-950 p-1 rounded-full w-8">
              {ordersSize}
            </span>
          )}
        </AccordionTrigger>
        <AccordionContent>
          <Input
            type="text"
            value={searchTerm}
            className="border border-green-500 my-8"
            placeholder="Nome do produto..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex flex-col gap-4 h-96 overflow-y-auto p-2 bg-zinc-200/5 scrollbar">
            {filteredOrdersUsers.map((orderUser) => {
              if (orderUser.Order.length === 0) {
                return null
              }

              return (
                <div
                  className="border-b border-white pb-4 flex justify-between gap-4 flex-col"
                  key={orderUser.id}
                >
                  <div className="flex flex-col">
                    <div className="flex gap-4">
                      <h3 className="font-bold">{orderUser.name}</h3>
                      <span>{orderUser.Order.length} pedidos</span>
                    </div>
                    <p className="text-sm text-zinc-300">{orderUser.email}</p>
                  </div>
                  <OrderUser
                    orders={orderUser.Order}
                    address={orderUser.Address}
                  />
                </div>
              )
            })}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
