'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface Props {
  orderId: string
  trackingCode: string
}

export const updateOrder = async ({ orderId, trackingCode }: Props) => {
  try {
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
  } catch (err) {
    console.log(err)
    return { message: 'Error ao inserir código' }
  }
}
