import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'
import { ProfileProps } from '@/core/@types/api-store'
import { api } from '@/lib/api'

export const getDataUser = async () => {
  const accessToken = await getAccessTokenFromCookies()

  if (!accessToken) {
    return {
      notFound: true,

      props: null,
    }
  }

  try {
    const response = await api.get('/buyer/profile', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    const profile: ProfileProps = response.data.profile

    return {
      props: {
        profile,
      },
    }
  } catch (err) {
    return {
      notFound: true,
      props: null,
    }
  }
}
