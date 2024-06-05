'use server'

import { api } from '../api'

interface GetDataProductResponse {
  props: {
    product?: string
    technicalProductDetails?: string
  }
  revalidate: number
  notFound?: boolean
}

export const getDataUniqueProduct = async (
  productId: string,
): Promise<GetDataProductResponse> => {
  try {
    const response = await api.get(`/product/details/${productId}`)

    return {
      props: {
        product: JSON.stringify(response.data.product),
        technicalProductDetails: JSON.stringify(
          response.data.technicalProductDetails,
        ),
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    return {
      notFound: true,

      revalidate: 0,
      props: {},
    }
  }
}
