import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { api } from '@/lib/api'
import { AuthOptions } from 'next-auth'
import { setAuthTokenForCookies } from '@/utils/set-auth-token-for-cookies'

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
          const refreshToken = response.data.refreshToken

          setAuthTokenForCookies({
            token: accessToken,
            key: '@shopping-store/AT.2.0',
          })
          setAuthTokenForCookies({
            token: refreshToken,
            key: '@shopping-store/RT.2.0',
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
