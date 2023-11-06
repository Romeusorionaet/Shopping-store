'use server'

import { PrismaClient } from '@prisma/client'

interface Props {
  dataProduct: {
    name: string
    slug: string
    description: string
    basePrice: string
    imageUrls: string[]
    categoryId: string
    discountPercentage: number
  }
}

const prisma = new PrismaClient()

export const createProduct = async ({ dataProduct }: Props) => {
  try {
    const existingProduct = await prisma.category.findFirst({
      where: {
        products: {
          some: {
            name: dataProduct.name,
          },
        },
      },
    })

    if (existingProduct) {
      return { message: 'Já existe um produto com esse nome nesta categoria.' }
    } else {
      await prisma.product.createMany({
        data: dataProduct,
      })

      return { message: 'Produto registrado.' }
    }
  } catch (err) {
    console.log(err)
    return { message: 'Error ao registrar produto' }
  }
}
