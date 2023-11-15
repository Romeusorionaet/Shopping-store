'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface updateProdutoProps {
  updatedData: {
    id: string
    name: string
    slug: string
    basePrice: string
    description: string
    imageUrls: string[]
    discountPercentage: string
    quantity: number
  }
}

export const updateProduct = async ({ updatedData }: updateProdutoProps) => {
  try {
    await prisma.product.update({
      where: {
        id: updatedData.id,
      },
      data: {
        name: updatedData.name,
        slug: updatedData.slug,
        basePrice: Number(updatedData.basePrice),
        discountPercentage: Number(updatedData.discountPercentage),
        imageUrls: updatedData.imageUrls,
        description: updatedData.description,
        quantity: updatedData.quantity,
      },
    })

    return { message: 'Produto atualizada.' }
  } catch (err) {
    console.log(err)
    return { message: 'Error ao atualizar produto.' }
  }
}
