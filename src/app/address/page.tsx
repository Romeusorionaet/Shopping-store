import { Form } from './components/form'
import { CheckoutCart } from './components/checkout-cart'
import { getDataAddress } from '@/lib/getData/get-data-address'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { SavedUserAddress } from '@/components/saved-user-address'

export default async function Address() {
  const session = await getServerSession(authOptions)
  const userId = session?.user.id

  if (!userId) {
    return <h1 className="text-center mt-10">Faça login na sua conta</h1>
  }
  const { props } = await getDataAddress(userId)

  const userHasAddress = !!props?.userAddress

  return (
    <div className="p-2 mt-4">
      <h1 className="font-bold">Preencha corretamente o local de entrega</h1>

      <div className="my-4">
        {props?.userAddress ? (
          <>
            <h2>Endereço salvo:</h2>
            <SavedUserAddress userAddress={props.userAddress} />
          </>
        ) : (
          <></>
        )}
      </div>

      <Form />

      <div className="flex justify-end">
        <CheckoutCart userHasAddress={userHasAddress} />
      </div>
    </div>
  )
}
