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
      <div className="bg-zinc-950 h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 uppercase text-xl">Acesso negado!</p>
      </div>
    )
  }

  return (
    <div className="bg-slate-950 text-white pt-28 min-h-screen">{children}</div>
  )
}
