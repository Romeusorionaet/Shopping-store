import { prismaClient } from '@/lib/prisma'

export const getDataAddress = async (userId: string) => {
  const userAddress = await prismaClient.address.findFirst({
    where: {
      userId,
    },
  })

  if (!userAddress) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      userAddress,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
