'use server'

import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'
import { api } from '../api'
import { ProfileProps } from '@/core/@types/api-store'

interface GetDataUserResponse {
  props: {
    profile?: ProfileProps
  }
  revalidate: number
  notFound?: boolean
}

export const getDataUser = async (): Promise<GetDataUserResponse> => {
  const accessToken = getAccessTokenFromCookies()

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
      revalidate: 60 * 60 * 24,
    }
  } catch (err) {
    return {
      notFound: true,
      revalidate: 0,
      props: {},
    }
  }
}
