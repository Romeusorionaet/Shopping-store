import { prismaClient } from '@/lib/prisma'

export const getDataCategory = async (slug: string) => {
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
    revalidate: 60 * 60 * 24, // 1 day
  }
}
