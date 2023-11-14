import { prismaClient } from '@/lib/prisma'

export const getDataUniqueProduct = async (slug: string) => {
  try {
    const product = await prismaClient.product.findFirst({
      where: {
        slug,
      },
      include: {
        category: {
          include: {
            products: {
              where: {
                slug: {
                  not: slug,
                },
              },
            },
          },
        },
      },
    })

    if (!product) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        product,
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (error) {
    return {
      error: 'Something went wrong while fetching unique product data.',
    }
  }
}
