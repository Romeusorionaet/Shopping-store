'use server'

import { prismaClient } from '@/lib/prisma'

export const getDataOrdersUsers = async () => {
  try {
    const ordersUsers = await prismaClient.user.findMany({
      where: {
        Order: {
          some: {
            id: {
              not: undefined,
            },
          },
        },
      },
      include: {
        Order: {
          include: {
            orderProducts: {
              include: {
                product: true,
              },
            },
          },
        },
        Address: true,
      },
    })

    return {
      ordersUsers,
    }
  } catch (err) {
    console.log(err)

    return { message: 'Algo de errado não está certo.' }
  }
}
