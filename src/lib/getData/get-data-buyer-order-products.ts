'use server'

import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'
import { api } from '../api'

export const getDataBuyerOrderProducts = async () => {
  const accessToken = getAccessTokenFromCookies()

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
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    return {
      notFound: true,

      props: {
        orderProducts: '[]',
      },
    }
  }
}
