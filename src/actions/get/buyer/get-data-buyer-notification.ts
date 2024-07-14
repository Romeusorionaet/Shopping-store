'use server'

import { api } from '@/lib/api'
import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'

export const getDataBuyerNotification = async (id: string) => {
  const accessToken = await getAccessTokenFromCookies()

  if (!accessToken) {
    return {
      notFound: true,

      props: null,
    }
  }

  try {
    const response = await api.get(`/buyer/read/notification/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return {
      props: {
        notification: JSON.stringify(response.data.notification),
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
