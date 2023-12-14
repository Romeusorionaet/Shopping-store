'use client'

import { Input } from '@/components/ui/input'
import {
  Address,
  OrderProduct,
  Product,
  Order,
  OrderAddress,
} from '@prisma/client'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion'
import { useMemo, useState } from 'react'
import { OrderUser } from '../order-management/order-user'

export interface OrderProducts extends OrderProduct {
  product: Product
}

export interface OrderProps extends Order {
  orderProducts: OrderProducts[]
  orderAddress: OrderAddress[]
}

export interface UserWithOrders {
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
      className="my-4 rounded-md border border-white/20 p-2"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger className="flex w-full justify-between">
          <p>Todos os pedidos</p>
          {hasOrders && (
            <span className="w-8 rounded-full border border-white p-1 font-bold">
              {ordersSize}
            </span>
          )}
        </AccordionTrigger>
        <AccordionContent>
          <Input
            type="text"
            value={searchTerm}
            className="my-8 border border-base_color_positive"
            placeholder="Nome do produto..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="scrollbar flex h-96 flex-col gap-4 overflow-y-auto bg-white/10 p-2">
            {filteredOrdersUsers.map((orderUser) => {
              if (orderUser.Order.length === 0) {
                return null
              }

              return (
                <div
                  className="flex flex-col justify-between gap-4 border-b border-white pb-4"
                  key={orderUser.id}
                >
                  <div className="flex flex-col">
                    <div className="flex gap-4">
                      <h3 className="font-bold">{orderUser.name}</h3>
                      <span>{orderUser.Order.length} pedidos</span>
                    </div>
                    <p className="text-sm opacity-80">{orderUser.email}</p>
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
