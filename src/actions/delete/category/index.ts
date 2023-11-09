'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const deleteCategory = async (categoryId: string) => {
  try {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    })

    return { message: 'Categoria deletada.' }
  } catch (err) {
    console.log(err)
    return { message: 'Error ao deletar categoria.' }
  }
}
