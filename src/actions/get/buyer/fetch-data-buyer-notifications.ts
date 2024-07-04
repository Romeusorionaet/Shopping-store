'use server'

import { api } from '@/lib/api'
import { getTokenFromCookies } from '@/utils/get-tokens-from-cookies'

export const fetchDataBuyerNotifications = async () => {
  const accessToken = getTokenFromCookies.accessToken()

  if (!accessToken) {
    return {
      notFound: true,

      props: null,
    }
  }

  try {
    const response = await api.get('/buyer/notifications', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return {
      props: {
        notifications: JSON.stringify(response.data.notifications),
      },
      revalidate: 60 * 60 * 24, // 1 day
    }
  } catch (err) {
    return {
      notFound: true,

      props: {
        notifications: null,
      },
    }
  }
}
