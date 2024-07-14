import { NotificationContextProvider } from '@/providers/notification-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import React from 'react'

const queryClient = new QueryClient()

export function renderWithProvidersForTests(ui: React.ReactElement) {
  return render(
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>{ui}</NotificationContextProvider>
    </QueryClientProvider>,
  )
}
