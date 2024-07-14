import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { KeyCookies } from './constants/key-cookies'

const getAccessToken = () => {
  const accessToken = cookies().get(KeyCookies.AT_STORE)
  return accessToken
}

function handleAuthenticatedRequest(request: NextRequest) {
  const accessToken = getAccessToken()

  if (accessToken) {
    const url = request.nextUrl.clone()

    if (url.pathname === '/signIn' || url.pathname === '/signUp') {
      url.pathname = '/'

      return NextResponse.redirect(url)
    }
  }

  return null
}

function handleUnauthenticatedRequest(request: NextRequest) {
  const accessToken = getAccessToken()

  if (!accessToken) {
    const url = request.nextUrl.clone()

    if (url.pathname.startsWith('/notification/')) {
      url.pathname = '/signIn'

      return NextResponse.redirect(url)
    }
  }

  return null
}

export async function middleware(request: NextRequest) {
  const response =
    handleAuthenticatedRequest(request) || handleUnauthenticatedRequest(request)

  return response || NextResponse.next()
}

export const config = {
  matcher: ['/signIn', '/signUp', '/', '/notification/:path*'],
}
