'use server'

import { authOptions } from '@/lib/auth'
import { prismaClient } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import jwt from 'jsonwebtoken'

export const verificationAdm = async (key: string) => {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id

  try {
    const result = await prismaClient.admAccessKey.findUnique({
      where: {
        id: userId,
      },
    })

    if (result) {
      const isSameKey = result.admKey === key

      if (isSameKey) {
        const tokenExpiration = '1m'
        const token = jwt.sign(
          { userId: result.id },
          process.env.JWT_SECRET_KEY_ADM,
          {
            expiresIn: tokenExpiration,
          },
        )

        await prismaClient.admAccessKey.update({
          where: {
            id: result.id,
          },
          data: {
            token,
          },
        })

        return { token }
      } else {
        return {
          messageError: 'Chave de acesso inválida. Verifique novamente.',
        }
      }
    }
  } catch (err) {
    console.error(err)
    return {
      messageError: 'Ocorreu um erro interno. Tente novamente mais tarde.',
    }
  }
}
