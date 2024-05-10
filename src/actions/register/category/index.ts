// 'use server'

// import { PrismaClient } from '@prisma/client'

// interface Props {
//   dataCategory: {
//     name: string
//     slug: string
//     fileUrl: string
//   }
// }

// const prisma = new PrismaClient()

// export const createCategory = async ({ dataCategory }: Props) => {
//   try {
//     const existingCategory = await prisma.category.findFirst({
//       where: {
//         name: dataCategory.name,
//       },
//     })

//     if (existingCategory) {
//       return { message: 'Este item já existe.' }
//     } else {
//       await prisma.category.create({
//         data: {
//           name: dataCategory.name,
//           slug: dataCategory.slug,
//           imageUrl: dataCategory.fileUrl,
//         },
//       })

//       return { messageSuccess: 'Categoria criado' }
//     }
//   } catch (err) {
//     console.log(err)
//     return { messageError: 'Error ao criar categoria' }
//   }
// }
