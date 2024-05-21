'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || 'default', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
  })
}

export const CSPostHogProvider = ({ children }: any) => {
  return <PostHogProvider>{children}</PostHogProvider>
}
