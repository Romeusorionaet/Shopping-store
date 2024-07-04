'use server'

import { api } from '@/lib/api'
import { getTokenFromCookies } from '@/utils/get-tokens-from-cookies'

export const getDataBuyerOrderProducts = async () => {
  const accessToken = getTokenFromCookies.accessToken()

  if (!accessToken) {
    return {
      notFound: true,

      props: null,
    }
  }

  try {
    const response = await api.get('/buyer/order/products', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return {
      props: {
        orderProducts: JSON.stringify(response.data.products),
      },
      revalidate: 60 * 60 * 24, // 1 day
    }
  } catch (err) {
    return {
      notFound: true,

      props: null,
    }
  }
}
