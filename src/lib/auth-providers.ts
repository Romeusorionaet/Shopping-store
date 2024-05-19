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
            {
              username: profile.name,
              email: profile.email,
              picture: profile.picture,
            },
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
            sameSite: 'lax',
          })

          cookies().set({
            name: '@shopping-store/RT.2.0',
            value: refreshToken,
            maxAge: refreshTokenExpires - Math.floor(Date.now() / 1000),
            sameSite: 'lax',
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
    async session({ session, token }) {
      session.user = { ...session.user, id: token.sub } as {
        id: string
        name: string
        email: string
        image: string
      }

      return session
    },
  },
}