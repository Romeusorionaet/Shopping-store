'use server'

import { api } from '@/lib/api'
import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'

export const getRetrieveCategorySummaries = async () => {
  const accessToken = await getAccessTokenFromCookies()

  if (!accessToken) {
    return {
      success: false,
      message: 'Não autorizado',
    }
  }

  try {
    const response = await api.get('/category/retrieve-summaries', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    return {
      props: {
        retrieveCategorySummaries: JSON.stringify(
          response.data.retrieveCategorySummaries,
        ),
      },
      revalidate: 60 * 60 * 24, // 1 day
    }
  } catch (err) {
    return {
      notFound: true,
      props: { retrieveCategorySummaries: '[]' },
    }
  }
}
