'use client'

import { getDataUser } from '@/lib/getData/get-data.user'
import { ReactNode, createContext, useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { getDataRefreshToken } from '@/lib/getData/get-data-refresh-token'
import { useNotification } from '@/hooks/use-notifications'

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

  const { notifyError } = useNotification()

  const [profile, setProfile] = useState<ProfileProps>({
    id: '',
    username: '',
    email: '',
    createAt: '',
    updateAt: '',
  })

  useEffect(() => {
    const fetchDataUser = async () => {
      const resultDataUser = await getDataUser()

      if (resultDataUser.props.profile) {
        setProfile(resultDataUser.props.profile)
      }

      if (!resultDataUser.props.profile && session.data) {
        const { success } = await getDataRefreshToken()

        if (!success) {
          await signOut()

          notifyError('Faça login em sua conta.')

          return
        }

        const { props } = await getDataUser()

        if (props.profile) {
          setProfile(props.profile)
        }
      }
    }

    fetchDataUser()
  }, [session.data, notifyError])

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
