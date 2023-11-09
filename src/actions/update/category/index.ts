'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

interface updateCategoryProps {
  updatedData: {
    name: string
    slug: string
    imageUrl: string
    id: string
  }
}

export const updateCategory = async ({ updatedData }: updateCategoryProps) => {
  try {
    await prisma.category.update({
      where: {
        id: updatedData.id,
      },
      data: {
        name: updatedData.name,
        slug: updatedData.slug,
        imageUrl: updatedData.imageUrl,
      },
    })

    return { message: 'Categoria atualizada.' }
  } catch (err) {
    console.log(err)
    return { message: 'Error ao atualizar categoria.' }
  }
}
