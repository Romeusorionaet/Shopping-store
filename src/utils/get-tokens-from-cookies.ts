import { KeyCookies } from '@/constants/key-cookies'
import { cookies } from 'next/headers'

class GetTokenFromCookies {
  accessToken() {
    const accessToken = cookies().get(KeyCookies.AT_STORE)

    if (!accessToken) {
      return
    }

    return accessToken.value
  }

  refreshToken() {
    const refreshToken = cookies().get(KeyCookies.RT_STORE)

    if (!refreshToken) {
      return null
    }

    return refreshToken.value
  }
}

export const getTokenFromCookies = new GetTokenFromCookies()
