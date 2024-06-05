'use client'

import { useEffect, useState } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet'
import { BaggageClaim, Bell, Phone } from 'lucide-react'
import { useCartStore } from '@/providers/zustand-store'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Cart } from './cart'
import { Button } from '../ui/button'

export function HandleCartArea() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [clientRendered, setClientRendered] = useState(false)

  const { cart } = useCartStore()
  const { data } = useSession()

  const router = useRouter()

  const conditionForShowSizeCart =
    clientRendered && cart.length !== 0 && data?.user.id

  useEffect(() => {
    // hydrate
    setClientRendered(true)
  }, [])

  const handleNavigateTo = (route: string) => {
    setIsCartOpen(false)
    router.push(route)
  }

  return (
    <div className="fixed bottom-0 left-0 z-20 flex w-full items-center justify-between border-t-2 border-slate-300 bg-white px-2">
      <div className="flex items-center gap-4">
        <div className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-base_one_reference_header text-base_color_text_top duration-700">
          <Bell size={30} />
          {/* {conditionForShowNotification && (
          <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white">
            <p>{clientRendered && notification.length}</p>
          </div>
        )} */}
        </div>
        <Button
          variant="ghost"
          className="hover:bg-transparent hover:text-base_color_dark"
        >
          <Phone className="hover:scale-105" size={30} />
        </Button>
      </div>

      <Sheet open={isCartOpen} onOpenChange={(open) => setIsCartOpen(open)}>
        <SheetTrigger asChild>
          <div className="rounded-full">
            <div className="relative flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-base_one_reference_header text-base_color_text_top duration-700">
              <BaggageClaim size={30} />
              {conditionForShowSizeCart && (
                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white">
                  <p>{clientRendered && cart.length}</p>
                </div>
              )}
            </div>
          </div>
        </SheetTrigger>

        <SheetContent className="bg-base_color_text_top text-foreground">
          <SheetHeader className="text-left text-lg font-bold">
            Carrinho
          </SheetHeader>

          <Cart handleNavigateTo={handleNavigateTo} />
        </SheetContent>
      </Sheet>
    </div>
  )
}
