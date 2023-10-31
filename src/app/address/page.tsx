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
    return <h1>Faça login na sua conta</h1>
  }
  const { props } = await getDataAddress(userId)

  return (
    <div>
      <h1>Complete seu pedido</h1>
      <div>
        <div>
          <h2>Endereço de Entrega</h2>
          <p>informe o endereço onde deseja receber seu pedido</p>
        </div>
      </div>

      <Form />

      <div>
        <h2>Endereço salvo</h2>
        {props?.userAddress ? (
          <SavedUserAddress userAddress={props.userAddress} />
        ) : (
          <span>Sem endereço salvo</span>
        )}
      </div>

      <CheckoutCart />
    </div>
  )
}
