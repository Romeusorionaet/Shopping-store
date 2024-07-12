'use client'

import { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet'
import { BaggageClaim } from 'lucide-react'
import { useCartStore } from '@/providers/zustand-store'
import { useRouter } from 'next/navigation'
import { CartOverview } from './cart-overview'

export function CartArea() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [clientRendered, setClientRendered] = useState(false)

  const cart = useCartStore((state) => state.cart)

  const router = useRouter()

  const conditionForShowSizeCart = clientRendered && cart.length !== 0

  useEffect(() => {
    // hydrate
    setClientRendered(true)
  }, [])

  const handleNavigateTo = (route: string) => {
    setIsCartOpen(false)
    router.push(route)
  }

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => setIsCartOpen(open)}>
      <SheetTrigger asChild>
        <button
          data-test-id="cart_trigger"
          className="rounded-full p-1 outline-none focus-visible:ring-2 focus-visible:ring-offset-base_one_reference_header"
        >
          <div className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-base_one_reference_header text-base_color_text_top duration-700">
            <BaggageClaim size={30} />
            {conditionForShowSizeCart && (
              <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white">
                <p>{clientRendered && cart.length}</p>
              </div>
            )}
          </div>
        </button>
      </SheetTrigger>

      <SheetContent className="bg-base_color_text_top text-foreground">
        <SheetHeader className="text-left text-lg font-bold">
          Carrinho
        </SheetHeader>

        <CartOverview handleNavigateTo={handleNavigateTo} />
      </SheetContent>
    </Sheet>
  )
}
