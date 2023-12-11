'use server'

import {
  Address,
  OrderStatus,
  OrderStatusTracking,
  PrismaClient,
} from '@prisma/client'

const prisma = new PrismaClient()

interface Props {
  orderId: string
  trackingCode?: OrderStatus | string
  orderTracking?: OrderStatusTracking
  userAddress?: Address
}

export const updateOrder = async ({
  orderId,
  trackingCode,
  orderTracking,
  userAddress,
}: Props) => {
  try {
    if (trackingCode && userAddress) {
      await prisma.orderAddress.createMany({
        data: {
          orderId,
          cep: userAddress.cep,
          city: userAddress.city,
          complement: userAddress.complement,
          email: userAddress.email,
          neighborhood: userAddress.neighborhood,
          number: userAddress.number,
          phoneNumber: userAddress.phoneNumber,
          street: userAddress.street,
          uf: userAddress.uf,
          username: userAddress.username,
        },
      })

      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          trackingCode,
          orderTracking: OrderStatusTracking.PRODUCT_DELIVERED_TO_CORREIOS,
        },
      })

      return { message: 'Código inserido com sucesso!' }
    }

    if (orderTracking) {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          orderTracking,
        },
      })

      return {
        message: 'Este pedido agora está na seção Pedidos Entregues.',
      }
    }

    return { message: 'Nada foi feito.' }
  } catch (err) {
    console.log(err)
    return { message: 'Error ao inserir código' }
  }
}
