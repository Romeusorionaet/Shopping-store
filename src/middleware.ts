import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const accessToken = await getAccessTokenFromCookies()

  if (accessToken) {
    const url = request.nextUrl.clone()

    if (url.pathname === '/signIn' || url.pathname === '/signUp') {
      url.pathname = '/'

      return NextResponse.redirect(url)
    }
  }

  if (!accessToken) {
    const url = request.nextUrl.clone()

    if (url.pathname.startsWith('/notification/')) {
      url.pathname = '/signIn'

      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/signIn', '/signUp', '/', '/notification/:path*'],
}
