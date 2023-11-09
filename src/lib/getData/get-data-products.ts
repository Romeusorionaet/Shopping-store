import { prismaClient } from '@/lib/prisma'

export const getDataProducts = async () => {
  try {
    const products = await prismaClient.product.findMany({})

    return {
      props: {
        products,
      },
      revalidate: 60 * 60 * 24, // 1 day
    }
  } catch (err) {
    console.log(err)

    return {
      notFound: true,
      props: {
        products: [],
      },
      revalidate: 0,
    }
  }
}
