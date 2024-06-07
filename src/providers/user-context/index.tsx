import { ReactNode, createContext, useEffect, useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { getDataUser } from '@/actions/get/user/get-data.user'
import { getDataRefreshToken } from '@/actions/get/refresh-token/get-data-refresh-token'

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

  const initialDataProfile = {
    id: '',
    username: '',
    email: '',
    createAt: '',
    updateAt: '',
  }

  const [profile, setProfile] = useState<ProfileProps>(initialDataProfile)

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

          return
        }

        const { props } = await getDataUser()

        if (props.profile) {
          setProfile(props.profile)
        }
      }
    }

    fetchDataUser()
  }, [session.data])

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
