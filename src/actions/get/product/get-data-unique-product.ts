import { api } from '@/lib/api'

export const getDataUniqueProduct = async (productId: string) => {
  try {
    const response = await api.get(`/product/details/${productId}`)

    return {
      props: {
        product: JSON.stringify(response.data.product),
        technicalProductDetails: JSON.stringify(
          response.data.technicalProductDetails,
        ),
      },
      revalidate: 60 * 60 * 24, // 1 day
    }
  } catch (err) {
    return {
      notFound: true,

      revalidate: 0,
      props: {},
    }
  }
}
