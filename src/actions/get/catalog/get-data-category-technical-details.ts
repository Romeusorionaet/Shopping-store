'use server'

import { api } from '@/lib/api'
import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'

export const getDataCategoryTechnicalDetails = async (categoryId: string) => {
  const accessToken = await getAccessTokenFromCookies()

  if (!accessToken) {
    return {
      success: false,
      message: 'Não autorizado',
    }
  }

  try {
    const response = await api.get(
      `/category/technical-details/${categoryId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return {
      props: {
        category: JSON.stringify(response.data),
      },
      revalidate: 60 * 60 * 24, // 1 day
    }
  } catch (err) {
    console.log(err, 'er')
    return {
      notFound: true,
      revalidate: 0,
      props: { category: null },
    }
  }
}
