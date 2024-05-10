'use server'

import { api } from '../api'

export const RefreshToken = async (refreshToken: string | undefined) => {
  try {
    const response = await api.post('/auth/user/refresh-token', {
      headers: {
        'Content-Type': 'application/json',
      },
      refreshId: refreshToken,
      withCredentials: true,
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
