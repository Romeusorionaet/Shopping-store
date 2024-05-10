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

  // vou ter que tentar da forma em que uso httpOnly para niguem ter acesso ao token
  // vou mudar o refreshToken para ele ser parecido com o accessToken e não precisar salvar no banco
  // acompanhar o video https://www.youtube.com/watch?v=5LaGTbPyZcc&t=975s

  // da forma que esta atualmente ja funciona mas tem risco de acessar o refreshToken
  // que não esta com httponly
  // fiz dessa forma porque não estava dando certo com httpOnly true pois minha api não recebia o token
  // mas isso era porque estava em modo de produção
  // vou limpar a aplicação e fazer o deploy para testar

  const accessToken = Cookies.get('@shopping-store/AT.2.0')
  const refreshToken = Cookies.get('@shopping-store/RT.2.0')

  useEffect(() => {
    const fetchDataUser = async () => {
      // if (accessToken) {
      const { props } = await getDataUser(accessToken)

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
