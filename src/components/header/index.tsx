'use client'

import {
  BaggageClaim,
  BookUser,
  Home,
  LibraryBig,
  LogIn,
  Menu,
  SlidersHorizontal,
} from 'lucide-react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../ui/sheet'
import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Separator } from '../ui/separator'
import { useRouter } from 'next/navigation'
import { Cart } from '../cart'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '@/providers/user-context'
import { useCartStore } from '@/providers/zustand-store'
import { checkIsPrivateRoute } from '@/utils/check-is-private-route'
import { DialogLoginAdm } from '../dialog-login-adm'

export function Header() {
  const { isAdm } = useContext(UserContext)
  const { cart } = useCartStore()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState<boolean | undefined>(false)

  const [clientRendered, setClientRendered] = useState(false)

  const { status, data } = useSession()
  const router = useRouter()

  const conditionForShowSizeCart =
    clientRendered && cart.length !== 0 && data?.user

  const userIsAuthenticated = status === 'unauthenticated'

  useEffect(() => {
    // For resolve warning about difference value between server side and client side
    setClientRendered(true)
  }, [])

  const handleLogin = async () => {
    try {
      await signIn()
    } catch (err) {
      console.log(err)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
    } catch (err) {
      console.log(err)
    }
  }

  const handleCancel = () => {
    setIsDialogOpen(false)
  }

  const handleNavigateTo = (route: string) => {
    const isPrivateRoute = checkIsPrivateRoute(route)

    if (isPrivateRoute) {
      setIsDialogOpen(true)
    } else {
      setIsMenuOpen(false)
      setIsCartOpen(false)
      router.push(route)
    }
  }

  return (
    <header className="fixed left-0 z-30 w-full rounded-none bg-base_one_reference_header p-4">
      <DialogLoginAdm handleCancel={handleCancel} isDialogOpen={isDialogOpen} />
      <div className="mx-auto flex max-w-[1680px] items-center justify-between">
        <Sheet
          modal={false}
          open={isMenuOpen}
          onOpenChange={(open) => setIsMenuOpen(open)}
        >
          <SheetTrigger
            asChild
            className="border-none bg-base_one_reference_header duration-700 hover:bg-white"
          >
            <Menu size={30} />
          </SheetTrigger>

          <SheetContent side="left">
            <SheetHeader className="text-left text-lg font-bold">
              Menu
            </SheetHeader>

            {!userIsAuthenticated && data?.user && (
              <div className="flex flex-col">
                <div className="flex items-center gap-2 py-4">
                  <Avatar>
                    <AvatarFallback>
                      {data.user.name?.[0].toUpperCase()}
                    </AvatarFallback>

                    {data.user.image && <AvatarImage src={data.user.image} />}
                  </Avatar>

                  <div className="flex flex-col">
                    <p className="font-medium">{data.user.name}</p>
                    <p className="text-sm opacity-75">Boas compras!</p>
                  </div>
                </div>

                <Separator className="opacity-20" />
              </div>
            )}

            <div className="mt-10 flex flex-col justify-start gap-8">
              {userIsAuthenticated && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleLogin}
                  className="w-full gap-4 font-semibold hover:bg-base_reference_card hover:text-primary"
                >
                  <LogIn />
                  Fazer login
                </Button>
              )}

              {!userIsAuthenticated && (
                <Button
                  size="icon"
                  variant="outline"
                  onClick={handleLogout}
                  className="w-full gap-4 font-semibold duration-700 hover:bg-base_reference_card hover:text-primary"
                >
                  <LogIn />
                  Sair
                </Button>
              )}

              <Button
                onClick={() => handleNavigateTo('/')}
                size="icon"
                className="group w-full justify-start gap-4 bg-transparent p-4 font-semibold duration-700 hover:bg-base_reference_card"
              >
                <Home
                  className="duration-700 group-hover:text-base_detail_decoration"
                  size={16}
                />
                Início
              </Button>

              <Button
                onClick={() => handleNavigateTo('/catalog')}
                size="icon"
                className="hover:bg-base_base_reference_card group w-full justify-start gap-4 bg-transparent p-4 font-semibold duration-700"
              >
                <LibraryBig
                  className="duration-700 group-hover:text-base_detail_decoration"
                  size={16}
                />
                Catálogo
              </Button>

              <Button
                onClick={() => handleNavigateTo('/orders')}
                size="icon"
                className="hover:bg-base_base_reference_card group w-full justify-start gap-4 bg-transparent p-4 font-semibold duration-700"
              >
                <BaggageClaim
                  className="duration-700 group-hover:text-base_detail_decoration"
                  size={16}
                />
                Meus pedidos
              </Button>

              <Button
                onClick={() => handleNavigateTo('/address')}
                size="icon"
                className="hover:50 group w-full justify-start gap-4 bg-transparent p-4 font-semibold duration-700"
              >
                <BookUser
                  className="duration-700 group-hover:text-base_detail_decoration"
                  size={16}
                />
                Endereço de entrega
              </Button>

              {isAdm ? (
                <Button
                  onClick={() => handleNavigateTo('/control-adm')}
                  size="icon"
                  className="group w-full justify-start gap-4 bg-transparent p-4 font-semibold duration-700 hover:bg-base_reference_card"
                >
                  <SlidersHorizontal
                    className="duration-700 group-hover:text-base_detail_decoration"
                    size={16}
                  />
                  Controlar produtos
                </Button>
              ) : (
                <></>
              )}
            </div>
          </SheetContent>
        </Sheet>

        <h1
          onClick={() => handleNavigateTo('/')}
          className="cursor-pointer text-2xl font-bold"
        >
          Shopping Store
        </h1>

        <Sheet open={isCartOpen} onOpenChange={(open) => setIsCartOpen(open)}>
          <SheetTrigger asChild>
            <div className="relative border-none bg-base_one_reference_header duration-700 hover:bg-white">
              <BaggageClaim size={30} />
              {conditionForShowSizeCart && (
                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 p-1 text-white">
                  <p>{clientRendered && cart.length}</p>
                </div>
              )}
            </div>
          </SheetTrigger>

          <SheetContent>
            <SheetHeader className="text-left text-lg font-bold">
              Carrinho
            </SheetHeader>

            <Cart handleNavigateTo={handleNavigateTo} />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
