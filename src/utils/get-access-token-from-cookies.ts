import Cookies from 'js-cookie'

export function getAccessTokenFromCookies() {
  if (typeof window === 'undefined') {
    return null
  }

  const accessToken = Cookies.get('@shopping-store/AT.2.0')
  if (accessToken) {
    return accessToken
  }
  return null
}
