'use server'

import { api } from '../api'

export const getDataOrders = async (accessToken: string, buyerId?: string) => {
  try {
    if (!buyerId) {
      return {
        notFound: true,

        props: {
          orders: '[]',
        },
        revalidate: 0,
      }
    }

    const response = await api.get(`/buyer/orders/${buyerId}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(response.data, '====')

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
      revalidate: 0,
    }
  }
}
