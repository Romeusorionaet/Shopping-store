import { prismaClient } from '@/lib/prisma'

export const getDataOrders = async (id: string) => {
  try {
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

    if (!orders || orders.length === 0) {
      return {
        notFound: true,
        props: {
          orders: [],
        },
        revalidate: 0,
      }
    }

    return {
      props: {
        orders,
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (error) {
    return {
      error: 'Something went wrong while fetching user orders.',
    }
  }
}
