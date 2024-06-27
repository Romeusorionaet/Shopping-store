import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'
import { NotificationsPreview } from './notifications-preview'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { UserMinus } from 'lucide-react'
import { fetchDataBuyerNotifications } from '@/actions/get/buyer/fetch-data-buyer-notifications'
import Link from 'next/link'

export async function NotificationsArea() {
  const token = getAccessTokenFromCookies()

  if (!token) {
    return (
      <Link href="/signIn" title="fazer login">
        <UserMinus size={24} />
      </Link>
    )
  }

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['notifications'],
    queryFn: () => fetchDataBuyerNotifications(),
    staleTime: 1000 * 60 * 30, // 30 minutes
  })

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotificationsPreview />
      </HydrationBoundary>
    </div>
  )
}
