// import { prismaClient } from '@/lib/prisma'

export const getDataCatalog = async () => {
  try {
    // const categories = await prismaClient.category.findMany({})

    return {
      propsCategories: {
        // categories: JSON.stringify(categories),
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    console.log(err)

    return {
      notFound: true,
      propsCategories: { categories: '[]' },
      revalidate: 0,
    }
  }
}
