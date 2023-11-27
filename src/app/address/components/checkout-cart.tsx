'use client'

import { createOrder } from '@/actions/order'
import { createCheckout } from '@/actions/checkout'
import { useSession } from 'next-auth/react'
import { useCartStore } from '@/providers/zustand-store'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Props {
  userHasAddress: boolean
}

export function CheckoutCart({ userHasAddress }: Props) {
  const { cart } = useCartStore()
  const { data } = useSession()

  const navigate = useRouter()

  const handleFinishPurchaseClick = async () => {
    try {
      if (cart.length === 0) {
        alert('Carrinho vazio!')
        navigate.push('/')
        return
      }
      const dataOrder = await createOrder(cart, (data?.user as any).id)

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
      className="mt-8 uppercase data-[address=false]:bg-zinc-400"
      onClick={handleFinishPurchaseClick}
    >
      Finalizar compra
    </Button>
  )
}
