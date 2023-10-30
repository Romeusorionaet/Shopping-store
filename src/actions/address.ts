'use server'

import { prismaClient } from '@/lib/prisma'

interface Props {
  dataAddress: {
    cep: string
    city: string
    uf: string
    street: string
    neighborhood: string
    number: string
    complement: string
    username: string
    phoneNumber: string
    email: string
  }
  userId: string
}

export const createAddress = async ({ dataAddress, userId }: Props) => {
  console.log(userId, dataAddress)
  const userAddress = await prismaClient.address.create({
    data: {
      userId,
      cep: dataAddress.cep,
      city: dataAddress.city,
      uf: dataAddress.uf,
      street: dataAddress.street,
      neighborhood: dataAddress.neighborhood,
      number: dataAddress.number,
      complement: dataAddress.complement,
      username: dataAddress.username,
      phoneNumber: dataAddress.phoneNumber,
      email: dataAddress.email,
    },
  })
  return userAddress
}
