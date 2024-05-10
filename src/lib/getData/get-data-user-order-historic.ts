// import { prismaClient } from '@/lib/prisma'

export const getUserOrdersHistoric = async (userId?: string) => {
  try {
    if (userId) {
      // const historic = await prismaClient.userOrdersHistoric.findMany({
      //   where: {
      //     userId,
      //   },
      // })

      return {
        props: {
          // historic: JSON.stringify(historic),
        },
        revalidate: 60 * 60 * 24,
      }
    } else {
      // const historic = await prismaClient.userOrdersHistoric.findMany({})

      return {
        props: {
          // historic: JSON.stringify(historic),
        },
        revalidate: 60 * 60 * 24,
      }
    }
  } catch (err) {
    console.log(err)

    return {
      notFound: true,

      props: {
        historic: '[]',
      },
      revalidate: 0,
    }
  }
}
