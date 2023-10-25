import { prismaClient } from '@/lib/prisma'

export const getDataProducts = async () => {
  // get only products that be discounted
  // discounted are products where discount ir more that 0
  const products = await prismaClient.product.findMany({})

  if (!products) {
    return {
      notFound: true,
      props: {
        products: [],
      },
      revalidate: 0,
    }
  }

  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
