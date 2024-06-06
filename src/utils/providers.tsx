'use client'

import { queryClient } from '@/lib/query-client'
import { AuthProvider } from '@/providers/auth'
import { UserContextProvider } from '@/providers/user-context'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserContextProvider>{children}</UserContextProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
