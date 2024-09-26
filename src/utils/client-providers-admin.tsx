'use client'

import { queryClient } from '@/lib/query-client'
import { AuthProvider } from '@/providers/auth'
import { MenuAsideContextProvider } from '@/providers/menu-admin-context'
import { NotificationContextProvider } from '@/providers/notification-context'
import { UserContextProvider } from '@/providers/user-context'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export default function ClientProvidersAdmin({
  children,
}: {
  children: ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserContextProvider>
          <NotificationContextProvider>
            <MenuAsideContextProvider>{children}</MenuAsideContextProvider>
          </NotificationContextProvider>
        </UserContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
