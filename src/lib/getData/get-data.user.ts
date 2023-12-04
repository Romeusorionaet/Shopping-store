import { getServerSession } from 'next-auth'
import { prismaClient } from '../prisma'
import { authOptions } from '../auth'

export const getDataUser = async () => {
  try {
    const session = await getServerSession(authOptions)
    const userId = session?.user.id

    if (!userId) {
      return {
        props: {
          isAdm: false,
        },
      }
    }

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
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    console.log(err)
    return {
      error: 'Something went wrong while fetching the user.',
    }
  }
}
