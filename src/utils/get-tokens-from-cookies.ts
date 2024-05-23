import { cookies } from 'next/headers'

export function getAccessTokenFromCookies() {
  const accessToken = cookies().get('@shopping-store/AT.2.0')

  if (!accessToken) {
    return
  }

  return accessToken.value
}

export function getRefreshTokenFromCookies() {
  const refreshToken = cookies().get('@shopping-store/RT.2.0')

  if (!refreshToken) {
    return null
  }

  return refreshToken.value
}
