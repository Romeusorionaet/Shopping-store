import jwt, { JwtPayload } from 'jsonwebtoken'

interface DecodedAccessToken extends JwtPayload {
  exp: number
}

export function extractExpirationTimeFromJwtToken(token: string) {
  const decodedAccessToken = jwt.decode(token) as DecodedAccessToken

  const tokenExpires = decodedAccessToken.exp

  return tokenExpires
}
