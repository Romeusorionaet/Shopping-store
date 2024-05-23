import { KeyCookies } from '@/constants/key-cookies'
import { cookies } from 'next/headers'

export function getAccessTokenFromCookies() {
  const accessToken = cookies().get(KeyCookies.AT_STORE)

  if (!accessToken) {
    return
  }

  return accessToken.value
}

export function getRefreshTokenFromCookies() {
  const refreshToken = cookies().get(KeyCookies.RT_STORE)

  if (!refreshToken) {
    return null
  }

  return refreshToken.value
}
