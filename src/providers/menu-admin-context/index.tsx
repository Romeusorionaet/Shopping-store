'use client'

import { ReactNode, createContext, useState } from 'react'

interface MenuAsideContextType {
  isExpandedMenuAside: boolean
  handleExpandMenuAside: () => void
}

interface MenuAsideContextProps {
  children: ReactNode
}

export const MenuAsideContext = createContext({} as MenuAsideContextType)

export function MenuAsideContextProvider({ children }: MenuAsideContextProps) {
  const [isExpandedMenuAside, setIsExpandedMenuAside] = useState(false)

  const handleExpandMenuAside = () => {
    if (isExpandedMenuAside) {
      setIsExpandedMenuAside(false)
      return
    } else {
      setIsExpandedMenuAside(true)
      return
    }
  }

  return (
    <MenuAsideContext.Provider
      value={{
        isExpandedMenuAside,
        handleExpandMenuAside,
      }}
    >
      {children}
    </MenuAsideContext.Provider>
  )
}
