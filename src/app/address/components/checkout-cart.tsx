'use client'

import { createOrder } from '@/actions/order'
import { createCheckout } from '@/actions/checkout'
import { loadStripe } from '@stripe/stripe-js'
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
    if (cart.length === 0) {
      alert('Carrinho vazio!')
      navigate.push('/')
      return
    }
    const order = await createOrder(cart, (data?.user as any).id)

    const checkout = await createCheckout(cart, order.id)

    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

    if (stripe) {
      stripe
        .redirectToCheckout({
          sessionId: checkout.id,
        })
        .then(function (result) {
          if (result.error) {
            console.error(result.error)
          }
        })
    }
  }

  return (
    <Button
      data-address={userHasAddress}
      disabled={!userHasAddress}
      className="mt-8 font-bold uppercase bg-amber-100 hover:bg-amber-200 duration-700 border data-[address=false]:bg-zinc-200"
      onClick={handleFinishPurchaseClick}
    >
      Finalizar compra
    </Button>
  )
}
