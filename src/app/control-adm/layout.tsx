'use client'

import { UserContext } from '@/providers/user-context'
import { useContext } from 'react'

interface Props {
  children: React.ReactNode
}

export default function LayoutAdm({ children }: Props) {
  const { isAdm } = useContext(UserContext)

  if (!isAdm) {
    return (
      <div className="bg-base_color_dark h-screen flex flex-col items-center justify-center">
        <p className="text-base_color_negative uppercase text-xl">
          Acesso negado!
        </p>
      </div>
    )
  }

  return (
    <div className="bg-base_color_dark text-white pt-28 min-h-screen">
      {children}
    </div>
  )
}
