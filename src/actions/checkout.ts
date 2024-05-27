'use server'

import { api } from '@/lib/api'
import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'

interface orderProductsProps {
  productId: string
  title: string
  imgUrl: string
  discountPercentage: number
  basePrice: number
  quantity: number
  description: string
  productColor: string
}

interface ObjectUrlProps {
  checkoutUrl: string
  successUrlWithSessionId: string
}

export const createCheckout = async (
  orderProduct: orderProductsProps[],
): Promise<{ initPointUrl: ObjectUrlProps | null; error: string | null }> => {
  const accessToken = getAccessTokenFromCookies()

  try {
    const response = await api.post(
      '/order/create',
      {
        orderProducts: [...orderProduct],
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return { initPointUrl: response.data, error: null }
  } catch (err: any) {
    const errorMessage = err.response?.data?.error || err.message

    return { initPointUrl: null, error: errorMessage }
  }
}
