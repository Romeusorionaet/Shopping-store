'use server'

import { cookies } from 'next/headers'
import { KeyCookies } from '@/constants/key-cookies'

export async function getAccessTokenFromCookies() {
  if (process.env.NEXT_ENV === 'test') {
    return 'fakeToken'
  }

  const accessToken = cookies().get(KeyCookies.AT_STORE)

  if (!accessToken) {
    return
  }

  return accessToken.value
}

export async function getRefreshTokenFromCookies() {
  const refreshToken = cookies().get(KeyCookies.RT_STORE)

  if (!refreshToken) {
    return null
  }

  return refreshToken.value
}
