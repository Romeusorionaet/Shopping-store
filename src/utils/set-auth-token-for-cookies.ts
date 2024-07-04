import { cookies } from 'next/headers'
import { extractExpirationTimeFromJwtToken } from './extract-expiration-time-from-jwt-token'

interface Props {
  token: string
  key: string
}

export const setAuthTokenForCookies = ({ token, key }: Props) => {
  const tokenExpires = extractExpirationTimeFromJwtToken(token)

  const currentUnixTimestamp = Math.floor(Date.now() / 1000)

  cookies().set({
    name: key,
    value: token,
    maxAge: tokenExpires - currentUnixTimestamp,
    sameSite: 'lax',
    httpOnly: true,
    secure: true,
  })
}
