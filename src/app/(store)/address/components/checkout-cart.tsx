// import { createOrder } from '@/actions/order'
import { createCheckout } from '@/actions/checkout'
import { useSession } from 'next-auth/react'
// import { useCartStore } from '@/providers/zustand-store'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ClipLoader from 'react-spinners/ClipLoader'
import { useNotification } from '@/hooks/use-notifications'

interface Props {
  userHasAddress: boolean
}

export function CheckoutCart({ userHasAddress }: Props) {
  // const { cart } = useCartStore()
  const { data } = useSession()
  const { notifyWarning, notifyError } = useNotification()

  const navigate = useRouter()

  if (!data) {
    return (
      <div className="mt-10">
        <ClipLoader color="#000" loading={!data} size={35} />
      </div>
    )
  }

  const handleFinishPurchaseClick = async () => {
    try {
      // if (cart.length === 0) {
      //   notifyWarning('Carrinho vazio')
      //   navigate.push('/')
      //   return
      // }
      // const dataOrder = await createOrder(cart, data.user.id)
      // if (!dataOrder.order) {
      //   notifyError(dataOrder.message)
      //   return
      // }
      // const initPointUrl = await createCheckout(cart, dataOrder.order.id)
      // if (initPointUrl) {
      //   window.open(initPointUrl, '_blank')
      // }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Button
      data-address={userHasAddress}
      disabled={!userHasAddress}
      className="mt-8 uppercase data-[address=false]:cursor-not-allowed data-[address=false]:bg-base_color_dark/10"
      onClick={handleFinishPurchaseClick}
    >
      Finalizar compra
    </Button>
  )
}
