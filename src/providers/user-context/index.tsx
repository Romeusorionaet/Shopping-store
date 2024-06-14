import { ReactNode, createContext, useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { getDataUser } from '@/actions/get/user/get-data.user'
import { getDataRefreshToken } from '@/actions/get/refresh-token/get-data-refresh-token'
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query'
import { KeyLocalStorage } from '@/constants/key-local-storage'

interface ProfileProps {
  username: string
  email: string
  createAt: string
  updateAt: string
}

interface UserContextType {
  profile: ProfileProps
  refetchUserProfile: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult>
}

interface UserContextProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: UserContextProps) {
  const session = useSession()

  const initialDataProfile = {
    username: '',
    email: '',
    createAt: '',
    updateAt: '',
  }

  const [profile, setProfile] = useState<ProfileProps>(initialDataProfile)

  const { data, refetch: refetchUserProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getDataUser(),
    enabled: !profile.username,
  })

  useEffect(() => {
    const fetchDataUser = async () => {
      const userLogged = localStorage.getItem(KeyLocalStorage.USER_LOGGED)

      if (data?.props.profile) {
        setProfile(data?.props.profile)
        localStorage.setItem(KeyLocalStorage.USER_LOGGED, 'true')
      }

      const hasSessionData = !data?.props.profile && session.data
      const hasUserLogged = !data?.props.profile && userLogged === 'true'

      if (hasSessionData || hasUserLogged) {
        const { success } = await getDataRefreshToken()

        if (!success) {
          localStorage.removeItem(KeyLocalStorage.USER_LOGGED)
          await signOut()
          return
        }

        refetchUserProfile()
      }
    }

    fetchDataUser()
  }, [session.data, data, refetchUserProfile])

  useEffect(() => {
    if (data?.props.profile) {
      setProfile(data?.props.profile)
    }
  }, [data])

  return (
    <UserContext.Provider
      value={{
        profile,
        refetchUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
