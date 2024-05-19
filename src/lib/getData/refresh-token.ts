'use server'

import { api } from '../api'

export const RefreshToken = async (refreshToken: string) => {
  try {
    const response = await api.get('/auth/user/refresh-token', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    return {
      props: {
        tokens: response.data,
      },
    }
  } catch (err) {
    return {
      error: 'Something went wrong while fetching refreshToken.',
    }
  }
}
