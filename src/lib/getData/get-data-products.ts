// import { prismaClient } from '@/lib/prisma'

export const getDataProducts = async () => {
  try {
    // const products = await prismaClient.product.findMany({
    //   include: {
    //     category: true,
    //   },
    // })

    return {
      props: {
        // products: JSON.stringify(products),
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    console.log(err)

    return {
      notFound: true,
      props: {
        products: '[]',
      },
      revalidate: 0,
    }
  }
}
