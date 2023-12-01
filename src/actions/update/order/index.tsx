'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Props {
  orderId: string
  trackingCode?: string
  orderTracking?: string
}

export const updateOrder = async ({
  orderId,
  trackingCode,
  orderTracking,
}: Props) => {
  try {
    if (trackingCode) {
      await prisma.order.update({
        where: {
          id: orderId,
        },
        data: {
          trackingCode,
          orderTracking: 'PRODUCT_DELIVERED_TO_CORREIOS',
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
