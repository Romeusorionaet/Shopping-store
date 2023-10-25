import { prismaClient } from '@/lib/prisma'

export const getDataCatalog = async () => {
  const categories = await prismaClient.category.findMany({})

  if (!categories) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      categories,
    },
    revalidate: 60 * 60 * 24, // 1 day
  }
}
