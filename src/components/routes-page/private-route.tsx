'use client'
import { checkIsPrivateRoute } from '@/utils/check-is-private-route'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  isAdm?: boolean
  children: React.ReactNode
}

export default function PrivateRoute({ children, isAdm }: Props) {
  const { push } = useRouter()

  const pathname = usePathname()
  const isPrivatePage = checkIsPrivateRoute(pathname)

  if (!isAdm && isPrivatePage) {
    push('/')
  }

  return <>{children}</>
}
