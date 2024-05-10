// 'use server'

// import { prismaClient } from '@/lib/prisma'

// interface Props {
//   dataAddress: {
//     cep: string
//     city: string
//     uf: string
//     street: string
//     neighborhood: string
//     number: string
//     complement: string
//     username: string
//     phoneNumber: string
//     email: string
//   }
//   userId: string
// }

// export const createAddress = async ({ dataAddress, userId }: Props) => {
//   const existingAddress = await prismaClient.address.findFirst({
//     where: {
//       userId,
//     },
//   })

//   if (existingAddress) {
//     const updatedAddress = await prismaClient.address.update({
//       where: {
//         id: existingAddress.id,
//       },
//       data: {
//         cep: dataAddress.cep,
//         city: dataAddress.city,
//         uf: dataAddress.uf,
//         street: dataAddress.street,
//         neighborhood: dataAddress.neighborhood,
//         number: dataAddress.number,
//         complement: dataAddress.complement,
//         username: dataAddress.username,
//         phoneNumber: dataAddress.phoneNumber,
//         email: dataAddress.email,
//       },
//     })
//     return { updatedAddress, message: 'Seu endereço foi atualizado' }
//   } else {
//     const newAddress = await prismaClient.address.create({
//       data: {
//         userId,
//         cep: dataAddress.cep,
//         city: dataAddress.city,
//         uf: dataAddress.uf,
//         street: dataAddress.street,
//         neighborhood: dataAddress.neighborhood,
//         number: dataAddress.number,
//         complement: dataAddress.complement,
//         username: dataAddress.username,
//         phoneNumber: dataAddress.phoneNumber,
//         email: dataAddress.email,
//       },
//     })
//     return { newAddress, message: 'Seu endereço foi salvo' }
//   }
// }
