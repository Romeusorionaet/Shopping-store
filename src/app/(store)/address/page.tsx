import { getServerSession } from 'next-auth'
import { NoUserMessage } from '@/components/no-user-message'
import { FormAddress } from './components/form-address'
import { DataCreditCardTest } from './components/data-credit-card-test'
import { authOptions } from '@/providers/google-providers'
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from '@tanstack/react-query'
import { getDataUserAddress } from '@/actions/get/user/get-data-user-address'

export default async function Address() {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id

  if (!userId) {
    return <NoUserMessage />
  }

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['addressData'],
    queryFn: () => getDataUserAddress(),
    staleTime: 1000 * 60 * 30, // 30 minutes
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
