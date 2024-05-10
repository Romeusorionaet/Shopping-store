// 'use server'

// import { PrismaClient } from '@prisma/client'

// interface Props {
//   dataProduct: {
//     name: string
//     slug: string
//     description: string
//     basePrice: string
//     imageUrls: string[]
//     categoryId: string
//     discountPercentage: number
//     quantity: number
//   }
// }

// const prisma = new PrismaClient()

// export const createProduct = async ({ dataProduct }: Props) => {
//   try {
//     const existingProduct = await prisma.category.findFirst({
//       where: {
//         AND: [
//           { id: dataProduct.categoryId },
//           {
//             products: {
//               some: {
//                 name: dataProduct.name,
//               },
//             },
//           },
//         ],
//       },
//     })

//     if (existingProduct) {
//       return { message: 'Já existe um produto com esse nome nesta categoria.' }
//     } else {
//       await prisma.product.createMany({
//         data: dataProduct,
//       })
//       return { messageSuccess: 'Produto registrado' }
//     }
//   } catch (err) {
//     console.log(err)
//     return { messageError: 'Error ao registrar produto' }
//   }
// }
