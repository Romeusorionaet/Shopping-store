// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/lib/auth'
// import { NoUserMessage } from '@/components/no-user-message'
import { FormAddress } from './components/form-address'

export default async function Address() {
  // const session = await getServerSession(authOptions)
  // const userId = session?.user.id

  // if (!userId) {
  //   return <NoUserMessage />
  // }

  return (
    <div className="p-2 pt-28">
      <h1 className="font-bold">Preencha corretamente o local de entrega</h1>

      <FormAddress />
    </div>
  )
}
