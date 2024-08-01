'use client'

import { queryClient } from '@/lib/query-client'
import { AddressFormContextProvider } from '@/providers/address-form-context'
import { AuthProvider } from '@/providers/auth'
import { NotificationContextProvider } from '@/providers/notification-context'
import { UserContextProvider } from '@/providers/user-context'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserContextProvider>
          <AddressFormContextProvider>
            <NotificationContextProvider>
              {children}
            </NotificationContextProvider>
          </AddressFormContextProvider>
        </UserContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
