import { prismaClient } from '@/lib/prisma'

export const getDataCategory = async (slug: string) => {
  try {
    const selectedProducts = await prismaClient.category.findFirst({
      where: {
        slug,
      },
      include: {
        products: true,
      },
    })

    if (!selectedProducts) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        selectedProducts,
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (error) {
    return {
      error:
        'Something went wrong while fetching data for the selected category.',
    }
  }
}
