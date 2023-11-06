'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface updateProdutoProps {
  updatedData: {
    name: string
    slug: string
    basePrice: string
    description: string
    discountPercentage: string
    imageUrls: string[]
    id: string
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
        imageUrls: updatedData.imageUrls,
        basePrice: Number(updatedData.basePrice),
        discountPercentage: Number(updatedData.discountPercentage),
        description: updatedData.description,
      },
    })

    return { message: 'Produto atualizada.' }
  } catch (err) {
    console.log(err)
    return { message: 'Error ao atualizar produto.' }
  }
}
