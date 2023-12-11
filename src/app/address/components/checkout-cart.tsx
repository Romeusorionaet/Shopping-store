'use client'

import { createOrder } from '@/actions/order'
import { createCheckout } from '@/actions/checkout'
import { useSession } from 'next-auth/react'
import { useCartStore } from '@/providers/zustand-store'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ClipLoader from 'react-spinners/ClipLoader'

interface Props {
  userHasAddress: boolean
}

export function CheckoutCart({ userHasAddress }: Props) {
  const { cart } = useCartStore()
  const { data } = useSession()

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
      if (cart.length === 0) {
        alert('Carrinho vazio!')
        navigate.push('/')
        return
      }
      const dataOrder = await createOrder(cart, data.user.id)

      if (!dataOrder.order) {
        alert(dataOrder.message)
        return
      }

      const initPointUrl = await createCheckout(cart, dataOrder.order.id)

      if (initPointUrl) {
        window.open(initPointUrl, '_blank')
      }
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Button
      data-address={userHasAddress}
      disabled={!userHasAddress}
      className="mt-8 uppercase data-[address=false]:bg-base_color_dark/10 data-[address=false]:cursor-not-allowed"
      onClick={handleFinishPurchaseClick}
    >
      Finalizar compra
    </Button>
  )
}
