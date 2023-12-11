import Cookies from 'js-cookie'

export function getAddressFromCookies() {
  if (typeof window === 'undefined') {
    return null
  }

  const addressData = Cookies.get('@shopping-store/address')
  if (addressData) {
    return JSON.parse(addressData)
  }
  return null
}
