import { prismaClient } from '@/lib/prisma'

export const getDataOrders = async (id?: string) => {
  try {
    if (!id) {
      return {
        notFound: true,

        props: {
          orders: '[]',
        },
        revalidate: 0,
      }
    }

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
        orderAddress: true,
      },
    })

    return {
      props: {
        orders: JSON.stringify(orders),
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    console.log(err)

    return {
      notFound: true,

      props: {
        orders: '[]',
      },
      revalidate: 0,
    }
  }
}
