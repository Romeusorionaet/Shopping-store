import { prismaClient } from '@/lib/prisma'

export const getDataCatalog = async () => {
  try {
    const categories = await prismaClient.category.findMany({})

    if (!categories || categories.length === 0) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        categories,
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (error) {
    return {
      error: 'Something went wrong while fetching the catalog data.',
    }
  }
}
