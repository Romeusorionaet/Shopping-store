'use client'

import { createOrder } from '@/actions/order'
import { createCheckout } from '@/actions/checkout'
import { loadStripe } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'
import { useCartStore } from '@/providers/zustand-store'
import { Button } from '@/components/ui/button'

export function CheckoutCart() {
  const { cart } = useCartStore()
  const { data } = useSession()

  const handleFinishPurchaseClick = async () => {
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
      className="mt-7 font-bold uppercase"
      onClick={handleFinishPurchaseClick}
    >
      Finalizar compra
    </Button>
  )
}
