import { prismaClient } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const GET = async (req: Request) => {
  try {
    const userId = req.headers.get('x-user-id')

    if (!userId) {
      return NextResponse.json({
        error: 'Ocorreu um erro ao buscar os dados de usuário.',
      })
    }

    const user = await prismaClient.user.findUnique({
      where: {
        id: userId,
      },
    })

    if (user && user.isAdm) {
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
      return NextResponse.json({ ordersUsers })
    }
  } catch (err) {
    return NextResponse.json({
      error: `Ocorreu um erro ao buscar os dados. ${err}`,
    })
  }
}
