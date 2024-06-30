import { NoUserMessage } from '@/components/no-user-message'
import { FormAddress } from './components/form-address'
import { DataCreditCardTest } from './components/data-credit-card-test'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getDataUserAddress } from '@/actions/get/user/get-data-user-address'
import { getAccessTokenFromCookies } from '@/utils/get-tokens-from-cookies'

export default async function Address() {
  const token = getAccessTokenFromCookies()

  if (!token) {
    return <NoUserMessage />
  }

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['addressData'],
    queryFn: getDataUserAddress,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
  })

  return (
    <div className="p-2 pt-28">
      <DataCreditCardTest />

      <h1 className="font-bold">Preencha corretamente o local de entrega</h1>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <FormAddress />
      </HydrationBoundary>
    </div>
  )
}
