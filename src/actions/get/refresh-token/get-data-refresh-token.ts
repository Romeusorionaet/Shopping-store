'use server'

import { getRefreshTokenFromCookies } from '@/utils/get-tokens-from-cookies'
import { setAuthTokenForCookies } from '@/utils/set-auth-token-for-cookies'
import { KeyCookies } from '@/constants/key-cookies'
import { api } from '@/lib/api'

interface BooleanResponse {
  success: boolean
}

export const getDataRefreshToken = async (): Promise<BooleanResponse> => {
  const refreshToken = await getRefreshTokenFromCookies()

  if (!refreshToken) {
    return { success: false }
  }

  try {
    const response = await api.get('/auth/user/refresh-token', {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    const accessToken: string = response.data.accessToken

    setAuthTokenForCookies({
      token: accessToken,
      key: KeyCookies.AT_STORE,
    })

    return { success: true }
  } catch (err) {
    return { success: false }
  }
}
