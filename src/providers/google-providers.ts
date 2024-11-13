import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'
import { api } from '@/lib/api'
import { AuthOptions } from 'next-auth'
import { setAuthTokenForCookies } from '@/utils/set-auth-token-for-cookies'
import { KeyCookies } from '@/constants/key-cookies'

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXTAUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GOOGLE_CLIENT_SECRET_ID,
      wellKnown: 'https://accounts.google.com/.well-known/openid-configuration',
      authorization: {
        url: 'https://accounts.google.com/o/oauth2/v2/auth',
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
          scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
          ].join(' '),
          include_granted_scopes: 'true',
          id: 'google',
          name: 'Google',
          type: 'oauth',
          idToken: true,
          checks: ['pkce', 'state'],
        },
      },
      async profile(profile: GoogleProfile) {
        try {
          if (profile.email_verified) {
            const response = await api.post('/auth/register/oauth/callback', {
              username: profile.name,
              email: profile.email,
              picture: profile.picture,
              emailVerified: profile.email_verified,
            })

            const { accessToken, refreshToken } = response.data

            setAuthTokenForCookies({
              token: accessToken,
              key: KeyCookies.AT_STORE,
            })
            setAuthTokenForCookies({
              token: refreshToken,
              key: KeyCookies.RT_STORE,
            })
          }
        } catch (err: any) {
          console.log(err.message)
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
