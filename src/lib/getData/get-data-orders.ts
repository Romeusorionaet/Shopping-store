import { prismaClient } from '@/lib/prisma'

export const getDataOrders = async (id: string) => {
  const orders = await prismaClient.order.findMany({
    where: {
      userId: id,
    },
    include: {
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  })

  if (!orders) {
    return {
      notFound: true,
      props: {
        products: [],
      },
      revalidate: 0,
    }
  }

  return {
    props: {
      orders,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
