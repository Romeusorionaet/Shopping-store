'use server'

import { prismaClient } from '@/lib/prisma'
import { CartProduct } from '@/providers/zustand-store'

export const createOrder = async (
  cartProducts: CartProduct[],
  userId: string,
) => {
  const invalidProducts: string[] = []

  for (const product of cartProducts) {
    const productId = product.id

    const verifyProduct = await prismaClient.product.findUnique({
      where: {
        id: productId,
      },
    })

    if (!verifyProduct || verifyProduct.quantity === 0) {
      if (verifyProduct) {
        invalidProducts.push(verifyProduct.name)
      }
    }
  }

  if (invalidProducts.length > 0) {
    const errorMessage = `Produto: ${invalidProducts.join(
      ', ',
    )} acabou de ser esgotado.`
    return { message: errorMessage }
  }

  const order = await prismaClient.order.create({
    data: {
      userId,
      status: 'WAITING_FOR_PAYMENT',
      orderProducts: {
        createMany: {
          data: cartProducts.map((product) => ({
            basePrice: product.basePrice,
            discountPercentage: product.discountPercentage,
            productId: product.id,
            quantity: product.quantity,
          })),
        },
      },
    },
  })

  return { order }
}
