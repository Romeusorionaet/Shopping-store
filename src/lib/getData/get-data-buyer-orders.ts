'use server'

import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'
import { api } from '../api'

export const getDataBuyerOrders = async () => {
  const accessToken = getAccessTokenFromCookies()

  try {
    const response = await api.get('/buyer/orders', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return {
      props: {
        orders: JSON.stringify(response.data.orders),
      },
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    return {
      notFound: true,

      props: {
        orders: '[]',
      },
    }
  }
}
