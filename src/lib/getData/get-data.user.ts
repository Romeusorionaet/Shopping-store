import { getServerSession } from 'next-auth'
import { prismaClient } from '../prisma'
import { authOptions } from '../auth'

export const getDataUser = async () => {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id

  if (userId) {
    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    })

    const isAdm = user?.isAdm

    return {
      props: {
        isAdm,
      },
      revalidate: 60 * 60 * 24, // 1 day
    }
  } else {
    return {
      props: {
        isAdm: false,
      },
      revalidate: 60 * 60 * 24, // 1 day
    }
  }
}
