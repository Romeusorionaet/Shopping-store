'use server'

import { api } from '@/lib/api'
import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'

export const getDataBuyerNotification = async (id: string) => {
  const accessToken = getAccessTokenFromCookies()

  // TODO aplicar essa mesma lógica para os demais para evitar de bater na api sem token
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
