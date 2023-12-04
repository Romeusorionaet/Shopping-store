import { prismaClient } from '@/lib/prisma'

export const getHistoricOrder = async (userId?: string) => {
  try {
    if (userId) {
      const historic = await prismaClient.historicOrder.findMany({
        where: {
          userId,
        },
      })

      return {
        props: {
          historic,
        },
        revalidate: 60 * 60 * 24,
      }
    } else {
      const historic = await prismaClient.historicOrder.findMany({})

      return {
        props: {
          historic,
        },
        revalidate: 60 * 60 * 24,
      }
    }
  } catch (err) {
    console.log(err)

    return {
      notFound: true,

      props: {
        historic: [],
      },
      revalidate: 0,
    }
  }
}
