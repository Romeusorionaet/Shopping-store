'use client'

import { getDataUser } from '@/lib/getData/get-data.user'
import { ReactNode, createContext, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { RefreshToken } from '@/lib/getData/refresh-token'

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
      console.log(accessToken, '==')
      // if (accessToken) {
      const { props } = await getDataUser()

      if (props) {
        setProfile(props.profile)
      }
      // }

      if (!props?.profile.id) {
        await RefreshToken(refreshToken)
      }

      // if (!accessToken && refreshToken) {
      //   const { props } = await RefreshToken(refreshToken)

      //   const accessToken: string = props?.tokens.accessToken

      //   const data = await getDataUser(accessToken)

      //   if (data.props) {
      //     setProfile(data.props.profile)
      //   }
      // }
    }

    fetchDataUser()
  }, [accessToken, refreshToken])

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
