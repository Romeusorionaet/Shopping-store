'use client'

import { getDataUser } from '@/lib/getData/get-data.user'
import { ReactNode, createContext, useEffect, useState } from 'react'

interface UserContextType {
  isAdm: boolean | undefined
}

interface UserContextProps {
  children: ReactNode
}

export const UserContext = createContext({} as UserContextType)

export function UserContextProvider({ children }: UserContextProps) {
  const [isAdm, setIsAdm] = useState<boolean | undefined>(false)

  useEffect(() => {
    async function fetchDataUser() {
      const { props } = await getDataUser()

      if (!props) {
        return null
      }

      setIsAdm(props.isAdm)
    }
    fetchDataUser()
  }, [])

  return (
    <UserContext.Provider
      value={{
        isAdm,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
