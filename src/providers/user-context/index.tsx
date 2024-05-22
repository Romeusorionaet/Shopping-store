'use client'

import { getDataUser } from '@/lib/getData/get-data.user'
import { ReactNode, createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { RefreshToken } from '@/lib/getData/refresh-token'
import { ExtractExpirationTimeFromJwtToken } from '@/utils/extract-expiration-time-from-jwt-token'
import { signOut, useSession } from 'next-auth/react'

interface ProfileProps {
  id: string
  username: string
  email: string
  createAt: string
  updateAt: string
}

interface UserContextType {
  profile: ProfileProps
}

interface UserContextProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: UserContextProps) {
  const session = useSession()
  const [profile, setProfile] = useState<ProfileProps>({
    id: '',
    username: '',
    email: '',
    createAt: '',
    updateAt: '',
  })

  const accessToken = Cookies.get('@shopping-store/AT.2.0')
  const refreshToken = Cookies.get('@shopping-store/RT.2.0')

  useEffect(() => {
    const fetchDataUser = async () => {
      if (accessToken) {
        const { props } = await getDataUser(accessToken)

        if (props?.profile) {
          setProfile(props.profile)
        }
      }

      // if (!accessToken && refreshToken) {
      //   const { props } = await RefreshToken(refreshToken)

      //   const accessToken: string = props?.tokens.accessToken

      //   const accessTokenExpires =
      //     ExtractExpirationTimeFromJwtToken(accessToken)

      //   const currentUnixTimestamp = Math.floor(Date.now() / 1000)

      //   document.cookie = `@shopping-store/AT.2.0=${accessToken}; max-age=${
      //     accessTokenExpires - currentUnixTimestamp
      //   }; path=/; SameSite=Lax`

      //   const data = await getDataUser(accessToken)

      //   if (data.props) {
      //     setProfile(data.props.profile)
      //   }
      // }
    }

    fetchDataUser()
  }, [accessToken, refreshToken])

  useEffect(() => {
    const signOutAutomatic = async () => {
      if (!refreshToken && session.data) {
        await signOut()
      }
    }

    signOutAutomatic()
  }, [refreshToken, session])

  return (
    <UserContext.Provider
      value={{
        profile,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
