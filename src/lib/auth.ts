import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { cookies } from 'next/headers'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { api } from '@/lib/api'
import { AuthOptions } from 'next-auth'

interface DecodedAccessToken extends JwtPayload {
  exp: number
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET_ID,
      authorization: {
        url: 'http://www.google.com/oauth/v2/accessToken',
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
          ].join(' '),
          include_granted_scopes: 'true',
        },
      },
      async profile(profile: GoogleProfile) {
        if (profile.email_verified) {
          const response = await api.post(
            '/auth/register/oauth-google/callback',
            { profile },
          )

          const accessToken = response.data.accessToken

          const decodedAccessToken = jwt.decode(
            accessToken,
          ) as DecodedAccessToken

          const accessTokenExpires = decodedAccessToken.exp

          const refreshToken = response.data.refreshToken

          const decodedRefreshToken = jwt.decode(
            refreshToken,
          ) as DecodedAccessToken

          const refreshTokenExpires = decodedRefreshToken.exp

          cookies().set({
            name: '@shopping-store/AT.2.0',
            value: accessToken,
            maxAge: accessTokenExpires - Math.floor(Date.now() / 1000),
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
            path: '/',
          })

          cookies().set({
            name: '@shopping-store/RT.2.0',
            value: refreshToken,
            maxAge: refreshTokenExpires - Math.floor(Date.now() / 1000),
            httpOnly: true,
            sameSite: 'lax',
            secure: true,
            path: '/',
          })
        }

        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session }) {
      session.user = { ...session.user } as {
        id: string
        name: string
        email: string
        image: string
      }

      return session
    },
  },
}

// olhar o repositório do rapaz e ver qual foi o geito que ele fez a config de auth google
