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
      propsOrdersUsers: {
        ordersUsers: JSON.stringify(ordersUsers),
      },
      revalidate: 0,
    }
  } catch (err) {
    console.log(err)

    return {
      notFound: true,
      propsOrdersUsers: { ordersUsers: '[]' },
      revalidate: 0,
    }
  }
}
