'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteProduct = async (productId: string) => {
  try {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    })

    return { message: 'Produto deletada.' }
  } catch (err) {
    console.log(err)
    return { message: 'Error ao deletar produto.' }
  }
}
