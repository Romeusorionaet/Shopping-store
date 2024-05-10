// import { prismaClient } from '@/lib/prisma'

export const getDataCategory = async (slug: string) => {
  try {
    // const selectedProducts = await prismaClient.category.findFirst({
    //   where: {
    //     slug,
    //   },
    //   include: {
    //     products: true,
    //   },
    // })

    return {
      props: {
        // selectedProducts: JSON.stringify(selectedProducts),
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    console.log(err)

    return {
      notFound: true,
      props: {
        selectedProducts: '[]',
      },
    }
  }
}
