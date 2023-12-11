import { prismaClient } from '@/lib/prisma'

export const getDataAddress = async (userId: string) => {
  try {
    const userAddress = await prismaClient.address.findFirst({
      where: {
        userId,
      },
    })

    if (!userAddress) {
      return {
        notFound: true,
        props: {
          userAddress: {},
        },
      }
    }

    return {
      props: {
        userAddress,
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    console.log(err)
    return {
      notFound: true,
      props: {
        userAddress: {},
      },
    }
  }
}
