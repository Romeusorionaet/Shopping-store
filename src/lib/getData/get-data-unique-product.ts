// import { prismaClient } from '@/lib/prisma'

export const getDataUniqueProduct = async (slug: string) => {
  try {
    // const product = await prismaClient.product.findFirst({
    //   where: {
    //     slug,
    //   },
    //   include: {
    //     category: {
    //       include: {
    //         products: {
    //           where: {
    //             slug: {
    //               not: slug,
    //             },
    //           },
    //         },
    //       },
    //     },
    //   },
    // })

    return {
      props: {
        // product: JSON.stringify(product),
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    console.log(err)

    return {
      notFound: true,
      props: {
        product: '[]',
      },
      revalidate: 0,
    }
  }
}
