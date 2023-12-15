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
      <div className="flex h-screen flex-col items-center justify-center bg-base_color_dark">
        <p className="text-xl uppercase text-base_color_negative">
          Acesso negado!
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base_color_dark pt-28 text-white">
      {children}
    </div>
  )
}
